import express from "express";
import { getPartById, getParts } from "../services/partsService";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { newPartSchema } from "../utils/validation/partsValidation";
import { NewPart } from "../types/partsTypes";
import { build } from "../models/part";
// import { Logger } from "tslog";
// const log: Logger = new Logger({ name: "myLogger" });

const partsRouter = express.Router();

partsRouter.get("/", (_req, res) => {
  res.send(getParts()).end();
});

partsRouter.get("/:id", (req, res) => {
  const partId = req.params.id;
  getPartById(partId)
    .then((foundPart) => {
      if (foundPart) {
        res.send(foundPart).end();
        return;
      }
      res
        .status(404)
        .json({ error: `part not found with id ${partId}` })
        .end();
    })
    .catch((error: Error) => console.log(error));
});

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
