import { Schema } from "express-validator";
import { isParentType } from "../types/partsTypes";
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

  "parent.parentId": {
    custom: {
      options: (value: string) => {
        return isValidObjectId(value);
      },
      errorMessage: "parentId is not a valid mongoose object ID",
    },
  },
};
