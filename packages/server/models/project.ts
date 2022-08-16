import mongoose from "mongoose";
import { Project } from "../types/projectTypes";

const partSchema = new mongoose.Schema<Project>({
  name: {
    type: String,
    required: true,
  },
  prefix: {
    type: String,
    required: true,
  },
});

partSchema.set("toJSON", {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform: (_document: any, returnedObject: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const ProjectModel = mongoose.model("Project", partSchema);

export const buildProject = (attr: Omit<Project, "id">) => {
  return new ProjectModel(attr);
};

export default ProjectModel;
