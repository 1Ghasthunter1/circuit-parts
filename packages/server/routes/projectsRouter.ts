import express from "express";
import { RequestHandler } from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { newProjectSchema } from "../validation/projectValidation";
import { NewProject, ProjectToDB } from "../types/projectTypes";
import ProjectModel from "../models/project";
import PartModel from "../models/part";
import AssemblyModel from "../models/assembly";

require("express-async-errors");

// import { Logger } from "tslog";
// const log: Logger = new Logger({ name: "myLogger" });

const projectsRouter = express.Router();

projectsRouter.get("/", (async (_req, res) => {
  const projects = await ProjectModel.find({});
  res.send(projects).end();
}) as RequestHandler);

projectsRouter.post(
  "/",
  checkSchema(newProjectSchema),
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newProject = <NewProject>matchedData(req, {
      locations: ["body"],
      includeOptionals: true,
    });

    const projectToDb: ProjectToDB = {
      ...newProject,
      creationDate: new Date(),
      type: "project",
      children: [],
    };

    const savedProject = await new ProjectModel(projectToDb).save();

    return res.status(201).json(savedProject).end();
  }
);

projectsRouter.get("/:id", (async (req, res) => {
  const projectId = req.params.id;
  const foundProject = await ProjectModel.findById(projectId).populate(
    "children.child"
  );

  if (!foundProject)
    return res
      .status(404)
      .json({ error: `project not found with id ${projectId}` });

  const populatedProject = {
    ...foundProject.toJSON(),
    children: foundProject.children.map((childObj) => childObj.child),
  };

  return res.status(200).send(populatedProject).end();
}) as RequestHandler);

projectsRouter.get("/:id/components", (async (req, res) => {
  const projectId = req.params.id;
  const foundProject = await ProjectModel.findById(projectId);
  if (!foundProject)
    return res
      .status(404)
      .json({ error: `project not found with id ${projectId}` });

  const parts = await PartModel.find({ project: projectId }).populate(
    "parent.parent"
  );
  const assemblies = await AssemblyModel.find({
    project: projectId,
  }).populate("parent.parent");

  const respJson = [...parts, ...assemblies];
  return res.status(200).send(respJson).end();
}) as RequestHandler);

projectsRouter.delete("/:id", (async (req, res) => {
  const projectId = req.params.id;
  const foundProject = await ProjectModel.findById(projectId);
  if (!foundProject)
    return res
      .status(404)
      .json({ error: `project not found with id ${projectId}` });

  await PartModel.deleteMany({ project: projectId });
  await AssemblyModel.deleteMany({
    project: projectId,
  });
  await foundProject.delete();

  return res.status(204).end();
}) as RequestHandler);

export default projectsRouter;
