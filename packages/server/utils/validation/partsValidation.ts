import { Schema } from "express-validator";
import { isParentType, isPartAssembly } from "../../types/partsTypes";

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
    isUUID: true,
    errorMessage: "Parent ID is not a valid UUID",
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
