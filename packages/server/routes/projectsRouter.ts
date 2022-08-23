import express from "express";
import { RequestHandler } from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { newProjectSchema } from "../validation/projectValidation";
import {
  NewProject,
  ProjectToDB,
  PopulatedProject,
} from "../types/projectTypes";
import {
  getMultipleAssysForUser,
  getMultiplePartsForUser,
} from "../utils/population";
import ProjectModel from "../models/project";
import PartModel from "../models/part";
import AssemblyModel from "../models/assembly";
import { ChildType } from "../types/universalTypes";
import { DatabaseAssembly } from "../types/assemblyTypes";
import { DatabasePart } from "../types/partsTypes";

require("express-async-errors");

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
  const foundProject = await ProjectModel.findById(projectId).populate<{
    children: Array<{
      childType: ChildType;
      child: DatabaseAssembly | DatabasePart;
    }>;
  }>("children.child");

  if (!foundProject)
    return res
      .status(404)
      .json({ error: `project not found with id ${projectId}` });

  return res
    .status(200)
    .send({
      ...foundProject.toJSON(),
      children: foundProject.children.map((childObj) => childObj.child),
    } as PopulatedProject)
    .end();
}) as RequestHandler);

projectsRouter.get("/:id/components", (async (req, res) => {
  const projectId = req.params.id;
  const foundProject = await ProjectModel.findById(projectId);
  if (!foundProject)
    return res
      .status(404)
      .json({ error: `project not found with id ${projectId}` });

  const parts = await getMultiplePartsForUser({ "project": projectId });
  const assemblies = await getMultipleAssysForUser({
    "project": projectId,
  });

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
