/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { Logger } from "tslog";
const log: Logger = new Logger({ name: "myLogger" });
import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (
  error,
  _request,
  response,
  next
) => {
  if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(400).send({ error: error.message });
  } else if (error.name === "TokenExpiredError") {
    return response.status(400).send({ error: error.message });
  }
  log.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.code === 11000) {
    return response.status(409).json({ error: "username must be unique" });
  }

  next(error);
  return;
};
