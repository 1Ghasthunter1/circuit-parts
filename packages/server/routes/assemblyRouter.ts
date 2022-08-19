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
import { findParent } from "../utils/generic";
require("express-async-errors");

const assemblyRouter = express.Router();

assemblyRouter.get("/", (async (_req, res) => {
  const assemblies = await AssemblyModel.find({});
  res.send(assemblies).status(200).end();
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

    if (!foundParent) {
      res
        .json({ error: `a(n) ${parentType} with id ${parent} does not exist` })
        .status(400)
        .end();
      return;
    }

    const newAssemblyObj: ToDatabaseAssembly = {
      ...newAssembly,
      status: "design in progress",
      partNumber: "696-2022-P-1234",
      priority: "normal",
      creationDate: new Date(),
    };

    const savedAssembly = await new AssemblyModel(newAssemblyObj).save();

    foundParent.children = foundParent.children.concat({
      childType: "assembly",
      child: savedAssembly.toJSON().id,
    });
    await foundParent.save();

    return res.json(savedAssembly).end();
  }
);
export default assemblyRouter;
