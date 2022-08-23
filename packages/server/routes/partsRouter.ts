import express from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { newPartSchema } from "../validation/partsValidation";
import { RequestHandler } from "express";
import PartModel from "../models/part";
import { findParent, findProject } from "../utils/generic";
import { NewPart, ToDatabasePart } from "../types/partsTypes";
import { generateNewPartNumber } from "../utils/partNumbers/generatePartNumber";
import AssemblyModel from "../models/assembly";
import mongoose from "mongoose";

import { getPartForUser } from "../utils/population";

require("express-async-errors");

const partsRouter = express.Router();

partsRouter.get("/", (async (_req, res) => {
  const parts = await PartModel.find({});
  res.status(200).send(parts).end();
}) as RequestHandler);

partsRouter.get("/:id", (async (req, res) => {
  const partId = req.params.id;
  const foundPart = await getPartForUser(partId);

  if (!foundPart)
    return res.status(404).json({ error: `part not found with id ${partId}` });

  return res.status(200).json(foundPart);
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
    const foundParent = await findParent(parentType, parent);
    const foundProject = await findProject(newPart.project);

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
        .status(400)
        .json({
          error: `'project' refers to an id ${newPart.project} does not exist`,
        })
        .end();
      return;
    }

    const partToDb: ToDatabasePart = {
      ...newPart,
      status: "design in progress",
      partNumber: await generateNewPartNumber(
        foundProject,
        foundParent,
        "part"
      ),
      type: "part",
      priority: "low",
      creationDate: new Date(),
    };

    const savedPart = await new PartModel(partToDb).save();

    foundParent.children = foundParent.children.concat({
      childType: "part",
      child: savedPart.toJSON().id,
    });
    await foundParent.save();

    return res.json(savedPart).end();
  }
);

partsRouter.delete("/:id", (async (req, res) => {
  const partId = req.params.id;

  const foundPart = await PartModel.findById(partId);
  if (!foundPart)
    return res.status(404).json({ error: `part not found with id ${partId}` });

  await AssemblyModel.findByIdAndUpdate(foundPart.parent.parent, {
    $pull: { children: { child: new mongoose.Types.ObjectId(partId) } },
  });

  await foundPart.delete();
  return res.status(204).end();
}) as RequestHandler);

export default partsRouter;
