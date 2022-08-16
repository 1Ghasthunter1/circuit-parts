import express from "express";
// import { RequestHandler } from "express";
require("express-async-errors");
import { checkSchema, validationResult, matchedData } from "express-validator";
import { newProjectSchema } from "../validation/projectValidation";
import { NewProject } from "../types/projectTypes";
import { buildProject } from "../models/project";

// import { Logger } from "tslog";
// const log: Logger = new Logger({ name: "myLogger" });

const projectsRouter = express.Router();

projectsRouter.post(
  "/",
  checkSchema(newProjectSchema),
  async (
    req: express.Request<never, never, NewProject>,
    res: express.Response
  ) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const validatedData = <NewProject>matchedData(req, {
      locations: ["body"],
      includeOptionals: true,
    });

    const projectToDB = buildProject({
      ...validatedData,
    });

    const returnedProject = await projectToDB.save();
    return res.status(201).json(returnedProject).end();
  }
);

export default projectsRouter;
