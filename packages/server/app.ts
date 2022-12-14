import express from "express";
import partsRouter from "./routes/partsRouter";
import projectsRouter from "./routes/projectsRouter";
import assemblyRouter from "./routes/assemblyRouter";
import usersRouter from "./routes/usersRouter";
import loginRouter from "./routes/loginRouter";
import orderRouter from "./routes/orderRouter";
import cors from "cors";
import mongoose from "mongoose";
import config from "./utils/config";
require("express-async-errors");
import { errorHandler } from "./utils/middleware/middleware";

import {
  userExtractor,
  tokenExtractor,
  adminRequired,
} from "./utils/middleware/middleware";

import { Logger } from "tslog";
import path from "path";
import refreshRouter from "./routes/refreshRouter";
const log: Logger = new Logger({ name: "appLogger" });

log.info(`MONGO_URI: ${config.MONGODB_URI}`);
log.info(`NODE_ENV: ${process.env.NODE_ENV}`);

mongoose
  .connect(config.MONGODB_URI || "")
  .then(() => {
    log.info("connected to MongoDB");
  })
  .catch((error: Error) => {
    log.error("error connecting to MongoDB:", error.message);
  });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "./build")));

app.use("/api/refresh", refreshRouter);
app.use("/api/login", loginRouter);

app.use("/api/*", tokenExtractor);
app.use("/api/*", userExtractor);

app.use("/api/users", usersRouter);
app.use("/api/parts", partsRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/assemblies", assemblyRouter);
app.use("/api/orders", orderRouter);

app.use("/api/*", adminRequired);

app.use("/api/*", errorHandler);

app.get("*", function (_req, res) {
  res.sendFile("index.html", {
    root: path.join(__dirname, "./build"),
  });
});

export default app;
