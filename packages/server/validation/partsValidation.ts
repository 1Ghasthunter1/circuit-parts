import { Schema } from "express-validator";
import { isParentType } from "../types/universalTypes";
import { isValidObjectId } from "mongoose";
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
