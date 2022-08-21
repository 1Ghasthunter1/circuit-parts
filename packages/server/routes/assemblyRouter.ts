import express from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { newAssemblySchema } from "../validation/assemblyValidation";
import { RequestHandler } from "express";
import AssemblyModel from "../models/assembly";
import {
  PopulatedAssembly,
  DatabaseAssembly,
  NewAssembly,
  ToDatabaseAssembly,
} from "../types/assemblyTypes";
import { DatabasePart } from "../types/partsTypes";
import { findParent, findProject } from "../utils/generic";
import { generateNewPartNumber } from "../utils/partNumbers/generatePartNumber";

require("express-async-errors");

const assemblyRouter = express.Router();

assemblyRouter.get("/", (async (req, res) => {
  const searchQuery = req.query.project ? { project: req.query.project } : {};
  const assemblies = await AssemblyModel.find(searchQuery);
  res.status(200).send(assemblies).end();
}) as RequestHandler);

assemblyRouter.get("/:id", (async (req, res) => {
  const assemblyId = req.params.id;
  const foundAssembly = await AssemblyModel.findById(assemblyId)
    .populate<{
      children: Array<{
        childType: string;
        child: DatabaseAssembly | DatabasePart;
      }>;
    }>({
      path: "children.child",
      populate: { path: "parent.parent" },
    })
    .populate("project");

  if (!foundAssembly)
    return res
      .status(404)
      .json({ error: `assembly not found with id ${assemblyId}` });

  const modifiedAssembly: PopulatedAssembly = {
    ...foundAssembly.toJSON(),
    children: foundAssembly.children.map((childObj) => childObj.child),
  };
  return res.status(200).send(modifiedAssembly).end();
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
export default assemblyRouter;
