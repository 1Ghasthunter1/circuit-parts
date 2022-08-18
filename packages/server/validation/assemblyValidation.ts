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

  "parent.parent": {
    custom: {
      options: (value: string) => {
        console.log(value);
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
