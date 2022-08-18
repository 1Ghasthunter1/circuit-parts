import express from "express";
import { getAssemblies } from "../services/assemblyService";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { newAssemblySchema } from "../validation/assemblyValidation";
import { Assembly, NewAssembly } from "../types/assemblyTypes";
import { RequestHandler } from "express";
import ProjectModel from "../models/project";
import AssemblyModel from "../models/assembly";
import { Child } from "../types/universalTypes";

// import { Logger } from "tslog";
// const log: Logger = new Logger({ name: "myLogger" });

require("express-async-errors");

const assemblyRouter = express.Router();

assemblyRouter.get("/", (async (_req, res) => {
  console.log("here");
  const assemblies = await getAssemblies();
  res.send(assemblies).status(200).end();
}) as RequestHandler);

assemblyRouter.get("/:id", (async (req, res) => {
  const assemblyId = req.params.id;
  const foundAssembly = await AssemblyModel.findById(assemblyId)
    .populate("children.child")
    .populate("project");
  if (foundAssembly) {
    const modifiedAssembly = {
      ...foundAssembly.toJSON(),
      children: foundAssembly.children.map((childObj) => childObj.child),
    };
    return res.status(200).send(modifiedAssembly).end();
  }

  return res
    .status(404)
    .json({ error: `assembly not found with id ${assemblyId}` });
}) as RequestHandler);

assemblyRouter.post(
  "/",
  checkSchema(newAssemblySchema),
  async (
    req: express.Request<never, never, NewAssembly>,
    res: express.Response
  ) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const validatedData = <NewAssembly>matchedData(req, {
      locations: ["body"],
      includeOptionals: true,
    });

    const parentId = validatedData.parent.parentId;
    const parentType = validatedData.parent.parentType;

    switch (parentType) {
      case "assembly":
        const foundAssembly = await AssemblyModel.findById(parentId);
        if (!foundAssembly) {
          return res.status(400).json({
            error: `${parentType} parent with given ID does not exist`,
          });
        }
        break;
      case "project":
        const foundProject = await ProjectModel.findById(parentId);
        if (!foundProject) {
          return res.status(400).json({
            error: `${parentType} parent with given ID does not exist`,
          });
        }
        break;
      default:
        throw new Error(`parent type "${parentType}" is invalid!`);
    }

    const savedAssembly: Assembly = await new AssemblyModel({
      ...validatedData,
      status: "design in progress",
      partNumber: "696-2022-P-1234",
      priority: "low",
      creationDate: new Date(),
      type: "assembly",
    }).save();

    const childObject: Child = {
      childType: "assembly",
      child: savedAssembly.id,
    };

    switch (parentType) {
      case "assembly":
        const foundAssembly = await AssemblyModel.findById(parentId);

        if (foundAssembly) {
          foundAssembly.children = foundAssembly.children.concat(childObject);
          await foundAssembly.save();
        }
        break;
      case "project":
        const foundProject = await ProjectModel.findById(parentId);

        if (foundProject) {
          foundProject.children = foundProject.children.concat(childObject);
          await foundProject.save();
        }

        break;
      default:
        throw new Error(`parent type "${parentType}" is invalid!`);
    }

    return res.json(savedAssembly).end();
  }
);
export default assemblyRouter;
