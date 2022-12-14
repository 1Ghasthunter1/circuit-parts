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
  vendorUrl: {
    isLength: {
      options: { max: 1000 },
      errorMessage: "`vendorUrl` cannot exceed 1000 chars",
    },
    optional: true,
  },
  quantity: {
    isInt: true,
    toInt: true,
    errorMessage: "`quantity` is not int or undefined",
    notEmpty: true,
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
    errorMessage: "`unitCost` is not float or undefined",
    notEmpty: true,
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
  orderNumber: {
    isString: true,
    isLength: {
      options: { max: 250 },
      errorMessage: "`orderNumber` cannot exceed 250 chars",
    },
    notEmpty: true,
  },
  vendor: {
    isString: true,
    isLength: {
      options: { max: 250 },
      errorMessage: "`vendor` cannot exceed 250 chars",
    },
    notEmpty: true,
  },
  "tracking.carrier": {
    isString: true,
    isLength: {
      options: { max: 1000 },
      errorMessage: "`tracking.carrier` cannot exceed 1000 chars",
    },
    
    optional: true,
  },
  "tracking.trackingNumber": {
    isString: true,
    isLength: {
      options: { max: 1000 },
      errorMessage: "`tracking.trackingNumber` cannot exceed 1000 chars",
    },
    optional: true,
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
