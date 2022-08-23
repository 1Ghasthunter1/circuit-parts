import express from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { newAssemblySchema } from "../validation/assemblyValidation";
import { RequestHandler } from "express";
import AssemblyModel from "../models/assembly";
import { NewAssembly, ToDatabaseAssembly } from "../types/assemblyTypes";
import { findParent, findProject } from "../utils/generic";
import { generateNewPartNumber } from "../utils/partNumbers/generatePartNumber";
import PartModel from "../models/part";
import ProjectModel from "../models/project";
import { Types } from "mongoose";
import {
  getAssyForUser,
  getMultipleAssysForUser,
  getMultiplePartsForUser,
} from "../utils/population";
import { Part } from "../types/partsTypes";
import { Assembly } from "../types/assemblyTypes";
require("express-async-errors");

const assemblyRouter = express.Router();

assemblyRouter.get("/", (async (req, res) => {
  const searchQuery = req.query.project ? { project: req.query.project } : {};
  const assemblies = await AssemblyModel.find(searchQuery);
  res.status(200).send(assemblies).end();
}) as RequestHandler);

assemblyRouter.get("/:id", (async (req, res) => {
  const assemblyId = req.params.id;
  const assembly = await getAssyForUser(assemblyId);

  if (!assembly)
    return res
      .status(404)
      .json({ error: `assembly not found with id ${assemblyId}` });

  return res.status(200).send(assembly).end();
}) as RequestHandler);

assemblyRouter.get("/:id/components", (async (req, res) => {
  const assemblyId = req.params.id;
  const foundAssembly = await AssemblyModel.findById(assemblyId);
  if (!foundAssembly)
    return res
      .status(404)
      .json({ error: `assembly not found with id ${assemblyId}` });

  const parts = await getMultiplePartsForUser({ "parent.parent": assemblyId });
  const assemblies = await getMultipleAssysForUser({
    "parent.parent": assemblyId,
  });

  const resData: (Part | Assembly)[] = [...parts, ...assemblies];

  return res.status(200).send(resData).end();
}) as RequestHandler);

assemblyRouter.post(
  "/",
  checkSchema(newAssemblySchema),
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newAssembly = <NewAssembly>matchedData(req, {
      locations: ["body"],
      includeOptionals: true,
    });

    const { parentType, parent } = newAssembly.parent;

    const foundParent = await findParent(parentType, parent);
    const foundProject = await findProject(newAssembly.project);

    if (!foundParent) {
      res
        .status(400)
        .json({
          error: `a(n) ${parentType} parent with id ${parent} does not exist`,
        })
        .end();
      return;
    }

    if (!foundProject) {
      res
        .json({
          error: `'project' refers to an id ${newAssembly.project} does not exist`,
        })
        .status(400)
        .end();
      return;
    }

    const newAssemblyObj: ToDatabaseAssembly = {
      ...newAssembly,
      status: "design in progress",
      partNumber: await generateNewPartNumber(
        foundProject,
        foundParent,
        "assembly"
      ),
      type: "assembly",
      priority: "normal",
      creationDate: new Date(),
    };

    const savedAssembly = await new AssemblyModel(newAssemblyObj).save();

    foundParent.children = foundParent.children.concat({
      childType: "assembly",
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      child: savedAssembly.id,
    });
    await foundParent.save();

    return res.json(savedAssembly).end();
  }
);

assemblyRouter.delete("/:id", (async (req, res) => {
  const assemblyId = req.params.id;

  const assembly = await AssemblyModel.findById(assemblyId);
  if (!assembly) return res.status(404).end();

  const parts = await PartModel.find({
    "parent.parent": new Types.ObjectId(assemblyId),
  });
  const assemblies = await AssemblyModel.find({
    "parent.parent": new Types.ObjectId(assemblyId),
  });
  if (parts.length !== 0 || assemblies.length !== 0) {
    return res.status(409).json({
      error: {
        content: `can't delete assembly with id ${assemblyId} because it has existing children`,
        type: "HAS_CHILDREN",
        children: [...parts, ...assemblies],
      },
    });
  }

  await ProjectModel.findByIdAndUpdate(assembly.parent.parent, {
    $pull: { children: { child: new Types.ObjectId(assemblyId) } },
  });
  await assembly.delete();

  return res.status(204).end();
}) as RequestHandler);

export default assemblyRouter;
