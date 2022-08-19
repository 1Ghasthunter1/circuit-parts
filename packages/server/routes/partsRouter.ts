import express from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { newPartSchema } from "../validation/partsValidation";
import { RequestHandler } from "express";
import ProjectModel from "../models/project";
import PartModel from "../models/part";
import AssemblyModel from "../models/assembly";

import { NewPart } from "../types/partsTypes";
require("express-async-errors");

const partsRouter = express.Router();

partsRouter.get("/", (async (_req, res) => {
  const parts = await PartModel.find({});
  res.send(parts).status(200).end();
}) as RequestHandler);

partsRouter.get("/:id", (async (req, res) => {
  const partId = req.params.id;
  const foundPart = await PartModel.findById(partId);
  if (foundPart) {
    return res.status(200).send(foundPart).end();
  }
  return res.status(404).json({ error: `part not found with id ${partId}` });
}) as RequestHandler);

partsRouter.post(
  "/",
  checkSchema(newPartSchema),
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newPart = <NewPart>matchedData(req, {
      locations: ["body"],
      includeOptionals: true,
    });

    const { parentType, parent } = newPart.parent;

    let foundParent;
    if (parentType === "assembly")
      foundParent = await AssemblyModel.findById(parent);
    else if (parentType === "project")
      foundParent = await ProjectModel.findById(parent);

    if (!foundParent) {
      res
        .json({ error: `a(n) ${parentType} with id ${parent} does not exist` })
        .status(400)
        .end();
      return;
    }

    const savedPart = await new PartModel({
      ...newPart,
      status: "design in progress",
      partNumber: "696-2022-P-1234",
      priority: "low",
      creationDate: new Date(),
    }).save();

    foundParent.children = foundParent.children.concat({
      childType: "part",
      child: savedPart.toJSON().id,
    });
    await foundParent.save();

    return res.json(savedPart).end();
  }
);
export default partsRouter;
