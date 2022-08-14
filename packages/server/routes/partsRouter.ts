import express from "express";
import { getPartById, getParts } from "../services/partsService";

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

export default partsRouter;
