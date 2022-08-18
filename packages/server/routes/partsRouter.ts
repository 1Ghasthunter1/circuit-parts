import express from "express";
import { getPartById, getParts } from "../services/partsService";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { newPartSchema } from "../validation/partsValidation";
import { NewPart, Part } from "../types/partsTypes";
import { RequestHandler } from "express";
import ProjectModel from "../models/project";
import PartModel from "../models/part";
import AssemblyModel from "../models/assembly";
import { Child } from "../types/universalTypes";

require("express-async-errors");

const partsRouter = express.Router();

partsRouter.get("/", (async (_req, res) => {
  const parts = await getParts();
  res.send(parts).status(200).end();
}) as RequestHandler);

partsRouter.get("/:id", (async (req, res) => {
  const partId = req.params.id;
  const foundPart = await getPartById(partId);
  if (foundPart) {
    return res.status(200).send(foundPart).end();
  }
  return res.status(404).json({ error: `part not found with id ${partId}` });
}) as RequestHandler);

partsRouter.post(
  "/",
  checkSchema(newPartSchema),
  async (
    req: express.Request<never, never, NewPart>,
    res: express.Response
  ) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const validatedData = <NewPart>matchedData(req, {
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

    const partToDB = new PartModel({
      ...validatedData,
      status: "design in progress",
      partNumber: "696-2022-P-1234",
      priority: "low",
      type: "part",
      creationDate: new Date(),
    });

    const savedPart: Part = await partToDB.save();

    const childObject: Child = {
      childType: "part",
      child: savedPart.id,
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
    return res.json(savedPart).end();
  }
);
export default partsRouter;
