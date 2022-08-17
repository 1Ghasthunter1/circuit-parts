import mongoose from "mongoose";
import { Assembly } from "../types/assemblyTypes";

const assemblySchema = new mongoose.Schema<Assembly>({
  name: {
    type: String,
    required: true,
  },
  parent: {
    parentType: { type: String, required: true },
    parentId: {
      type: mongoose.Types.ObjectId,
      refPath: "parent.parentType",
      required: true,
    },
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
  priority: String,
  creationDate: Date,
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

const AssemblyModel = mongoose.model("Assembly", assemblySchema);

export const build = (attr: Omit<Assembly, "id">) => {
  return new AssemblyModel(attr);
};

export default AssemblyModel;
