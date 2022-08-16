import mongoose from "mongoose";
import { Part } from "../types/partsTypes";

const partSchema = new mongoose.Schema<Part>({
  name: {
    type: String,
    required: true,
  },
  parent: {
    parentType: { type: String, required: true },
    parentId: {
      type: mongoose.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  },
  partNumber: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  notes: { type: String, default: "" },
  sourceMaterial: { type: String, default: "" },
  haveMaterial: { type: String, default: "" },
  materialCutLength: { type: String, default: "" },
  quantityRequired: { type: String, default: "" },
  priority: String,
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

const PartModel = mongoose.model("Part", partSchema);

export const build = (attr: Omit<Part, "id">) => {
  return new PartModel(attr);
};

export default PartModel;
