import {
  matchedData,
  validationResult,
} from "express-validator";
import express, { RequestHandler } from "express";

export const parseValidated = <T>(req: express.Request): T => {
  const parsedData = <T>matchedData(req, {
    locations: ["body"],
    includeOptionals: true,
  });
  return parsedData;
};

export const handleSchemaErrors: RequestHandler = (
  req: express.Request,
  res: express.Response,
  next
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
};
