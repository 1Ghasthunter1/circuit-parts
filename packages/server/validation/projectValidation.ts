import { Schema } from "express-validator";

export const newProjectSchema: Schema = {
  name: {
    isString: true,
    errorMessage: "Name must be string",
  },
  prefix: {
    isString: true,
    errorMessage: "Prefix must be string",
  },
};
