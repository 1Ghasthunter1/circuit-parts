import { Schema } from "express-validator";
import { isParentType, isPartAssembly } from "../../types/partsTypes";
import { isValidObjectId } from "mongoose";
export const newPartSchema: Schema = {
  name: {
    isString: true,
    errorMessage: "Name must be string",
  },

  "parent.parentType": {
    custom: {
      options: (value: string) => {
        console.log(value);
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
  type: {
    custom: {
      options: (value: string) => {
        return isPartAssembly(value);
      },
      errorMessage: "type is not part or assembly",
    },
  },
};