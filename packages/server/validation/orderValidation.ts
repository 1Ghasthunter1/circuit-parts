import { Schema } from "express-validator";
import { isValidObjectId } from "mongoose";
import ProjectModel from "../models/project";
import { isOrderStatus } from "../types/universalTypes";

export const newOrderItemSchema: Schema = {
  partNumber: {
    isLength: {
      options: { max: 250 },
      errorMessage: "`partNumber` cannot exceed 250 chars",
    },
    notEmpty: true,
  },
  quantity: {
    isInt: true,
    toInt: true,
    errorMessage: "`quantity` is not int or undefined",
    optional: true,
  },
  description: {
    isLength: {
      options: { max: 500 },
      errorMessage: "`description` cannot exceed 500 chars",
    },
    optional: true,
  },
  unitCost: {
    isFloat: true,
    toFloat: true,
    errorMessage: "`unitCost` is not float",
    optional: true,
  },
  notes: {
    isLength: {
      options: { max: 500 },
      errorMessage: "`notes` cannot exceed 500 chars",
    },
    optional: true,
  },
};

export const newOrderSchema: Schema = {
  project: {
    custom: {
      options: async (value: string) => {
        if (!value) return Promise.reject("`project` must be defined");
        if (!isValidObjectId(value))
          return Promise.reject("`project` is not a valid object id");
        const foundProject = await ProjectModel.findById(value);
        if (!foundProject) {
          return Promise.reject(
            "`project` does not refer to an active project id"
          );
        }
        return Promise.resolve();
      },
    },
  },
  status: {
    custom: {
      options: (value: string) => isOrderStatus(value),
      errorMessage: "`status` must be an order status",
    },
  },
  vendor: {
    isString: true,
    isLength: {
      options: { max: 250 },
      errorMessage: "`vendor` cannot exceed 250 chars",
    },
    notEmpty: true,
  },
  tax: {
    isFloat: true,
    toFloat: true,
    errorMessage: "`tax` must be float",
    optional: true,
  },
  shipping: {
    isFloat: true,
    toFloat: true,
    errorMessage: "`shipping` must be float",
    optional: true,
  },
  purchaser: {
    isString: true,
    isLength: {
      options: { max: 250 },
      errorMessage: "`purchaser` cannot exceed 250 chars",
    },
    optional: true,
  },
  reimbursed: {
    isBoolean: true,
    toBoolean: true,
    errorMessage: "`reimbursed` must be boolean",
    optional: true,
  },
  orderDate: {
    isDate: true,
    toDate: true,
    errorMessage: "`orderDate` must be date",
    optional: true,
  },
  notes: {
    isString: true,
    isLength: {
      options: { max: 1000 },
      errorMessage: "`notes` cannot exceed 1000 chars",
    },
    optional: true,
  },
};
