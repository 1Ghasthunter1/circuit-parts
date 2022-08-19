import { ParentType } from "../types/universalTypes";
import mongoose from "mongoose";
import AssemblyModel from "../models/assembly";
import ProjectModel from "../models/project";

export const findParent = async (
  parentType: ParentType,
  parentId: mongoose.Types.ObjectId
) => {
  let foundParent;
  if (parentType === "assembly")
    foundParent = await AssemblyModel.findById(parentId);
  else if (parentType === "project")
    foundParent = await ProjectModel.findById(parentId);
  return foundParent;
};

export const findProject = async (projectId: mongoose.Types.ObjectId) => {
  return await ProjectModel.findById(projectId);
};
