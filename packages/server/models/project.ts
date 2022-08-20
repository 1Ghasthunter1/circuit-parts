import mongoose from "mongoose";
import { DatabaseProject } from "../types/projectTypes";
import childrenSchema from "./schemas/childrenSchema";
const projectSchema = new mongoose.Schema<DatabaseProject>({
  name: {
    type: String,
    required: true,
  },
  prefix: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    required: true,
  },
  type: {
    required: true,
    type: String,
    enum: ["project"],
  },
  description: { type: String, default: "" },
  children: [childrenSchema],
});

projectSchema.set("toJSON", {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform: (_document: any, returnedObject: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const ProjectModel = mongoose.model("project", projectSchema);

export default ProjectModel;
