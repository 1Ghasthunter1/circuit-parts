import mongoose from "mongoose";
import {
  DatabaseComponent,
  isComponentType,
  isParentType,
  isPartStatus,
  isAssemblyStatus,
} from "../types/componentTypes";

const partSchema = new mongoose.Schema<DatabaseComponent>({
  name: {
    type: String,
    required: true,
  },
  type: {
    required: true,
    type: String,
    validate: {
      validator: (value: string) => isComponentType(value),
      message: "`type` must be of a component type.",
    },
  },
  parent: {
    parentType: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) => isParentType(value),
        message: "`parent.parentType` must be of a parent type.",
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
  partNumber: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) =>
        isPartStatus(value) || isAssemblyStatus(value),
      message: "`status` is not a valid assembly or part status",
    },
  },
  priority: String,
  creationDate: { type: Date, required: true },
  children: [
    {
      type: mongoose.Types.ObjectId,
      ref: "components",
      default: [],
    },
  ],
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

const PartModel = mongoose.model("component", partSchema);

export default PartModel;
