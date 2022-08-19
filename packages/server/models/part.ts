import mongoose from "mongoose";
import { DatabasePart, isPartStatus } from "../types/partsTypes";
import { isParentType, isPriority } from "../types/universalTypes";
const partSchema = new mongoose.Schema<DatabasePart>({
  name: {
    type: String,
    required: true,
  },
  partNumber: {
    type: String,
    required: true,
  },
  parent: {
    parentType: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) => isParentType(value),
        message: "`parent.parentType` is not a parent type",
      },
    },
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
  status: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => isPartStatus(value),
      message: "`status` is not a valid part status",
    },
  },
  priority: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => isPriority(value),
      message: "`priority` is not a valid priority",
    },
  },
  creationDate: { type: Date, required: true },
  notes: { type: String, default: "" },
  sourceMaterial: { type: String, default: "" },
  haveMaterial: { type: String, default: "" },
  materialCutLength: { type: String, default: "" },
  quantityRequired: { type: String, default: "" },
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
