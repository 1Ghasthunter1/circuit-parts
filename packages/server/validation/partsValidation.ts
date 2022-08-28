import { Schema } from "express-validator";
import { isParentType, isPriority } from "../types/universalTypes";
import { isValidObjectId } from "mongoose";
import { isPartStatus } from "../types/partsTypes";
export const newPartSchema: Schema = {
  name: {
    isString: true,
    errorMessage: "Name must be string",
  },

  "parent.parentType": {
    custom: {
      options: (value: string) => {
        return isParentType(value);
      },
      errorMessage: "parent type is invalid",
    },
  },

  "parent.parent": {
    custom: {
      options: (value: string) => {
        if (!value) throw new Error("field `parent.parent` is reqiured");
        if (!isValidObjectId(value))
          throw new Error("field `parent.parent` is not a valid mongoose id");
        return true;
      },
    },
  },

  project: {
    custom: {
      options: (value: string) => {
        if (!value) throw new Error("field `project` is reqiured");
        if (!isValidObjectId(value))
          throw new Error("field `project` is not a valid mongoose id");
        return true;
      },
    },
  },
};

export const editedPartSchema: Schema = {
  name: newPartSchema.name,
  status: {
    custom: {
      options: (value: string) => {
        if (!isPartStatus(value))
          throw new Error("field `status` is not a valid part status");
        return true;
      },
    },
  },
  priority: {
    custom: {
      options: (value: string) => {
        if (!isPriority(value))
          throw new Error("field `priority` is not a valid priority");
        return true;
      },
    },
  },
  notes: {
    isLength: {
      options: { max: 2000 },
      errorMessage: "notes cannot exceed 2000 chars",
    },
  },
  sourceMaterial: {
    isLength: {
      options: { max: 2000 },
      errorMessage: "`notes` cannot exceed 2000 chars",
    },
  },
  haveMaterial: {
    isBoolean: true,
  },
  materialCutLength: {
    isLength: {
      options: { max: 250 },
      errorMessage: "`materialCutLength` cannot exceed 250 chars",
    },
  },
  quantityRequired: {
    isInt: true,
  },
};
