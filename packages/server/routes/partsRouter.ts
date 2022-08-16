import express from "express";
import { getPartById, getParts } from "../services/partsService";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { newPartSchema } from "../validation/partsValidation";
import { NewPart } from "../types/partsTypes";
import { build } from "../models/part";
import { RequestHandler } from "express";
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

    const validatedData = <NewPart>matchedData(req, {
      locations: ["body"],
      includeOptionals: true,
    });

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const partToDB = build({
      ...validatedData,
      status: "design in progress",
      partNumber: "696-2022-P-1234",
      priority: "low",
    });
    const savedPart = await partToDB.save();
    return res.json(savedPart).end();
  }
);
export default partsRouter;
