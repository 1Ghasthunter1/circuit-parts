import { DatabaseProject } from "../types/projectTypes";
import ProjectModel from "../models/project";

export const getProjects = async (): Promise<DatabaseProject[] | null> => {
  const resp = await ProjectModel.find({});
  return resp;
};

export const getProjectById = async (id: string): Promise<DatabaseProject | null> => {
  const resp = await ProjectModel.findById<DatabaseProject>(id);
  return resp;
};
