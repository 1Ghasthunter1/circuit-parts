import mongoose from "mongoose";
import { DatabaseAssembly } from "../types/assemblyTypes";

const assemblySchema = new mongoose.Schema<DatabaseAssembly>({
  name: {
    type: String,
    required: true,
  },
  parent: {
    parentType: { type: String, required: true },
    parent: {
      type: mongoose.Types.ObjectId,
      refPath: "parent.parentType",
      required: true,
    },
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
    required: true,
  },
  partNumber: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  notes: { type: String, default: "" },
  priority: { type: String, required: true },
  creationDate: { type: Date, required: true },
  children: [
    {
      childType: { type: String, required: true },
      child: {
        type: mongoose.Types.ObjectId,
        refPath: "children.childType",
        required: true,
      },
      _id: false,
    },
  ],
});

assemblySchema.set("toJSON", {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform: (_document: any, returnedObject: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const AssemblyModel = mongoose.model("assembly", assemblySchema);

export const buildAssembly = (attr: Omit<Assembly, "id">) => {
  return new AssemblyModel(attr);
};

export default AssemblyModel;
