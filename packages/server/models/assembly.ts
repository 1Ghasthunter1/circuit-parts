import mongoose from "mongoose";
import { DatabaseAssembly } from "../types/assemblyTypes";
import childSchema from "./schemas/childrenSchema";
import parentSchema from "./schemas/parentSchema";
const assemblySchema = new mongoose.Schema<DatabaseAssembly>({
  name: {
    type: String,
    required: true,
  },
  parent: parentSchema,
  children: [childSchema],
  path: [parentSchema],
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
    required: true,
  },
  partNumber: {
    type: String,
    required: true,
  },
  type: {
    required: true,
    type: String,
    enum: ["assembly"],
  },
  status: {
    type: String,
    required: true,
  },
  notes: { type: String, default: "" },
  priority: { type: String, required: true },
  creationDate: { type: Date, required: true },
});

assemblySchema.set("toJSON", {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform: (_document: any, returnedObject: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const AssemblyModel = mongoose.model("assembly", assemblySchema);

export default AssemblyModel;
