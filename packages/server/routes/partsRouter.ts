import express from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { newPartSchema } from "../validation/partsValidation";
import { RequestHandler } from "express";
import ProjectModel from "../models/project";
import PartModel from "../models/part";
import ComponentModel from "../models/component";
import { componentToDbPart } from "../utils/componentConverter";
import { DatabasePart, NewPart } from "../types/componentTypes";
require("express-async-errors");

const partsRouter = express.Router();

partsRouter.get("/", (async (_req, res) => {
  const parts = await ComponentModel.find({});
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
      foundParent = await ComponentModel.findById(parent);
    else if (parentType === "project")
      foundParent = await ProjectModel.findById(parent);

    //The following checks that the foundParent exists AND that it is not a part (meaning either project or assembly)
    if (
      !foundParent ||
      ("type" in foundParent && foundParent.type === "part")
    ) {
      res
        .json({
          error: `a(n) ${parentType} with id ${parent} does not exist`,
        })
        .status(400)
        .end();
      return;
    }

    const databasePart: Omit<DatabasePart, "id"> = {
      ...newPart,
      status: "design in progress",
      partNumber: "696-2022-P-1234",
      priority: "low",
      type: "part",
      creationDate: new Date(),
    };

    const componentToDB = new ComponentModel(databasePart);
    const savedPart = await componentToDB.save();
    if (savedPart)
      throw new Error(
        "something went really wrong! a saved component that's supposed to be a part did not return as a part! good luck :)"
      );

    //Have to check children exists: although above if/else determines that we have proj or assembly,
    //the foundParent object is still Component, which has children?, not children. Therefore verification is madnatory
    if (foundParent.children) {
      foundParent.children = foundParent.children?.concat(savedPart.id);
    }
    await foundParent.save();

    return res.json(savedPart).end();
  }
);
export default partsRouter;
