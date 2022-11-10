"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newOrderSchema = exports.newOrderItemSchema = void 0;
const mongoose_1 = require("mongoose");
const project_1 = __importDefault(require("../models/project"));
const universalTypes_1 = require("../types/universalTypes");
exports.newOrderItemSchema = {
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
exports.newOrderSchema = {
    project: {
        custom: {
            options: (value) => __awaiter(void 0, void 0, void 0, function* () {
                if (!value)
                    return Promise.reject("`project` must be defined");
                if (!(0, mongoose_1.isValidObjectId)(value))
                    return Promise.reject("`project` is not a valid object id");
                const foundProject = yield project_1.default.findById(value);
                if (!foundProject) {
                    return Promise.reject("`project` does not refer to an active project id");
                }
                return Promise.resolve();
            }),
        },
    },
    status: {
        custom: {
            options: (value) => (0, universalTypes_1.isOrderStatus)(value),
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
//# sourceMappingURL=orderValidation.js.map