import express from "express";
import { RequestHandler } from "express";
require("express-async-errors");
import { checkSchema, validationResult, matchedData } from "express-validator";
import { newProjectSchema } from "../validation/projectValidation";
import { NewProject } from "../types/projectTypes";
import ProjectModel, { buildProject } from "../models/project";
import { getProjects, getProjectById } from "../services/projectsService";

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
      creationDate: new Date(),
    });

    const returnedProject = await projectToDB.save();
    return res.status(201).json(returnedProject).end();
  }
);

projectsRouter.get("/", (async (_req, res) => {
  const projects = await getProjects();
  res.send(projects).status(200).end();
}) as RequestHandler);

projectsRouter.delete("/:id", (async (req, res) => {
  const projectId = req.params.id;
  const foundProject = await getProjectById(projectId);
  if (foundProject) {
    await ProjectModel.findByIdAndDelete(projectId);
    return res.status(204).end();
  }
  return res
    .status(404)
    .json({ error: `project not found with id ${projectId}` });
}) as RequestHandler);

export default projectsRouter;
