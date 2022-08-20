import express from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { newPartSchema } from "../validation/partsValidation";
import { RequestHandler } from "express";
import PartModel from "../models/part";
import { findParent, findProject } from "../utils/generic";
import { NewPart, PopulatedPart } from "../types/partsTypes";
import { DatabaseProject } from "../types/projectTypes";
import { DatabaseAssembly } from "../types/assemblyTypes";
import { doThing } from "../utils/partNumbers/generatePartNumber";
require("express-async-errors");

const partsRouter = express.Router();

partsRouter.get("/ooga", (async (_req, res) => {
  const result = await doThing();
  console.log(`res from thing: ${result}`);
  res.status(200).end();
}) as RequestHandler);

partsRouter.get("/", (async (_req, res) => {
  const parts = await PartModel.find({});
  res.send(parts).status(200).end();
}) as RequestHandler);

partsRouter.get("/:id", (async (req, res) => {
  const partId = req.params.id;
  const foundPart = await PartModel.findById(partId).populate<{
    parent: {
      parentType: string;
      parent: DatabaseAssembly | DatabaseProject;
    };
  }>("parent.parent");

  if (!foundPart)
    return res.status(404).json({ error: `part not found with id ${partId}` });

  const populatedPart: PopulatedPart = {
    ...foundPart.toJSON(),
    parent: foundPart.parent.parent,
  };

  return res.status(200).json(populatedPart);
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
        .json({
          error: `a(n) ${parentType} parent with id ${parent} does not exist`,
        })
        .status(400)
        .end();
      return;
    }

    if (!foundProject) {
      res
        .json({
          error: `'project' refers to an id ${newPart.project} does not exist`,
        })
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
