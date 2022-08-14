import express from "express";
import { getParts } from "../services/partsService";

const partsRouter = express.Router();

partsRouter.get("/", (_req, res) => {
  res.send(getParts()).end();
});

export default partsRouter;
