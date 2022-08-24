import { Schema } from "express-validator";
import { isUserRole } from "../types/universalTypes";
export const newUserSchema: Schema = {
  firstName: {
    isString: true,
    notEmpty: true,
    isLength: { options: { min: 6, max: 255 } },
    errorMessage: "First name must be string and between 6 and 255 chars",
  },
  lastName: {
    isString: true,
    notEmpty: true,
    isLength: { options: { min: 6, max: 255 } },
    errorMessage: "Last name must be string and between 6 and 255 chars",
  },
  username: {
    isString: true,
    notEmpty: true,
    isLength: { options: { min: 3, max: 255 } },
    matches: {
      options: /^[a-zA-Z0-9]+$/,
      errorMessage: "username must only include chars a-z and numbers 0-9",
    },
  },
  email: {
    isString: true,
    notEmpty: true,
    isLength: { options: { min: 3, max: 255 } },
    isEmail: { errorMessage: "email must be a valid email" },
  },
  password: {
    isString: true,
    notEmpty: true,
    isLength: { options: { min: 3, max: 255 } },
  },
  role: {
    isString: true,
    notEmpty: true,
    custom: {
      options: (value: string) => isUserRole(value),
      errorMessage: "role must be user or admin"
    },
  },
};
