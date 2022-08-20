import express from "express";
import partsRouter from "./routes/partsRouter";
import projectsRouter from "./routes/projectsRouter";
import assemblyRouter from "./routes/assemblyRouter";
import cors from "cors";
import mongoose from "mongoose";
import config from "./utils/config";
require("express-async-errors");
import { errorHandler } from "./utils/middleware/middleware";
import { Logger } from "tslog";
const log: Logger = new Logger({ name: "myLogger" });

log.info(`MONGO_URI: ${config.MONGODB_URI}`);
log.info(`NODE_ENV: ${process.env.NODE_ENV}`);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    log.info("connected to MongoDB");
  })
  .catch((error: Error) => {
    log.error("error connecting to MongoDB:", error.message);
  });

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/parts", partsRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/assemblies", assemblyRouter);

app.use(errorHandler);

export default app;
