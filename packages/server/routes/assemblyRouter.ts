import express from "express";
import { getAssemblyById, getAssemblies } from "../services/assemblyService";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { newAssemblySchema } from "../validation/assemblyValidation";
import { NewAssembly } from "../types/assemblyTypes";
import { build } from "../models/assembly";
import { RequestHandler } from "express";
import ProjectModel from "../models/project";

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
  const foundAssembly = await getAssemblyById(assemblyId);
  if (foundAssembly) {
    return res.status(200).send(foundAssembly).end();
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
        const foundAssembly = undefined;
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

    const partToDB = build({
      ...validatedData,
      status: "design in progress",
      partNumber: "696-2022-P-1234",
      priority: "low",
      creationDate: new Date(),
    });
    const savedPart = await partToDB.save();
    return res.json(savedPart).end();
  }
);
export default assemblyRouter;
