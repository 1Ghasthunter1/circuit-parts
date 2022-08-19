import mongoose from "mongoose";
import { DatabasePart } from "../types/partsTypes";

const partSchema = new mongoose.Schema<DatabasePart>({
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
  sourceMaterial: { type: String, default: "" },
  haveMaterial: { type: String, default: "" },
  materialCutLength: { type: String, default: "" },
  quantityRequired: { type: String, default: "" },
  priority: String,
  creationDate: { type: Date, required: true },
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

const PartModel = mongoose.model("part", partSchema);

export default PartModel;
