import mongoose from "mongoose";
import { DatabasePart, isPartStatus } from "../types/partsTypes";
import { isPriority } from "../types/universalTypes";
import parentSchema from "./schemas/parentSchema";
const partSchema = new mongoose.Schema<DatabasePart>({
  name: {
    type: String,
    required: true,
  },
  partNumber: {
    type: String,
    required: true,
  },
  type: {
    required: true,
    type: String,
    enum: ["part"],
  },
  parent: parentSchema,
  path: [parentSchema],
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
  haveMaterial: { type: Boolean, default: true },
  materialCutLength: { type: String, default: "" },
  quantityRequired: { type: Number, default: 1 },
});

partSchema.set("toJSON", {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform: (_document: any, returnedObject: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const PartModel = mongoose.model("part", partSchema);

export default PartModel;
