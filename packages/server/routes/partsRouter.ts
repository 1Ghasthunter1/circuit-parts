import express from "express";
import { getPartById, getParts } from "../services/partsService";
import { checkSchema, validationResult } from "express-validator";
import { newPartSchema } from "../utils/validation/partsValidation";

// import { Logger } from "tslog";
// const log: Logger = new Logger({ name: "myLogger" });

const partsRouter = express.Router();

partsRouter.get("/", (_req, res) => {
  res.send(getParts()).end();
});

partsRouter.get("/:id", (req, res) => {
  const partId = req.params.id;
  const foundPart = getPartById(partId);
  if (foundPart) {
    res.send(foundPart).end();
    return;
  }
  res
    .status(404)
    .json({ error: `part not found with id ${partId}` })
    .end();
});



partsRouter.post(
  "/test",
  checkSchema(newPartSchema),
  (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(typeof req.body.thing2);
    return res.json(req.body).end();
  }
);
export default partsRouter;
