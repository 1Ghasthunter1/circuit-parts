import { Project } from "../types/projectTypes";
import ProjectModel from "../models/project";

export const getProjects = async (): Promise<Project[] | null> => {
  const resp = await ProjectModel.find({});
  return resp;
};

export const getProjectById = async (id: string): Promise<Project | null> => {
  const resp = await ProjectModel.findById<Project>(id);
  return resp;
};
