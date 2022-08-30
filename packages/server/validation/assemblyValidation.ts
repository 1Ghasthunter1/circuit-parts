import { Schema } from "express-validator";
import { isParentType, isPriority } from "../types/universalTypes";
import { isAssemblyStatus } from "../types/assemblyTypes";
import { isValidObjectId } from "mongoose";

export const newAssemblySchema: Schema = {
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
        if (!value) throw new Error("parent.parent is reqiured");
        if (!isValidObjectId(value))
          throw new Error("parent.parent is not a valid mongoose id");
        return true;
      },
    },
  },

  project: {
    custom: {
      options: (value: string) => {
        return isValidObjectId(value);
      },
      errorMessage: "project is not a valid mongoose object ID",
    },
  },
};

export const editedAssemblySchema: Schema = {
  name: newAssemblySchema.name,
  status: {
    isString: true,
    custom: {
      options: (value: string) => isAssemblyStatus(value),
      errorMessage: "field `status` must be an assembly status",
    },
  },
  priority: {
    isString: true,
    custom: {
      options: (value: string) => isPriority(value),
      errorMessage: "field `priority` must be an assembly status",
    },
  },
  notes: {
    isLength: {
      options: { max: 2000 },
      errorMessage: "notes cannot exceed 2000 chars",
    },
  },
};
