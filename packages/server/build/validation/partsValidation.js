"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editedPartSchema = exports.newPartSchema = void 0;
const universalTypes_1 = require("../types/universalTypes");
const mongoose_1 = require("mongoose");
const partsTypes_1 = require("../types/partsTypes");
exports.newPartSchema = {
    name: {
        isString: true,
        errorMessage: "Name must be string",
    },
    "parent.parentType": {
        custom: {
            options: (value) => {
                return (0, universalTypes_1.isParentType)(value);
            },
            errorMessage: "parent type is invalid",
        },
    },
    "parent.parent": {
        custom: {
            options: (value) => {
                if (!value)
                    throw new Error("field `parent.parent` is reqiured");
                if (!(0, mongoose_1.isValidObjectId)(value))
                    throw new Error("field `parent.parent` is not a valid mongoose id");
                return true;
            },
        },
    },
    project: {
        custom: {
            options: (value) => {
                if (!value)
                    throw new Error("field `project` is reqiured");
                if (!(0, mongoose_1.isValidObjectId)(value))
                    throw new Error("field `project` is not a valid mongoose id");
                return true;
            },
        },
    },
};
exports.editedPartSchema = {
    name: exports.newPartSchema.name,
    status: {
        custom: {
            options: (value) => {
                if (!(0, partsTypes_1.isPartStatus)(value))
                    throw new Error("field `status` is not a valid part status");
                return true;
            },
        },
    },
    priority: {
        custom: {
            options: (value) => {
                if (!(0, universalTypes_1.isPriority)(value))
                    throw new Error("field `priority` is not a valid priority");
                return true;
            },
        },
    },
    notes: {
        isLength: {
            options: { max: 2000 },
            errorMessage: "notes cannot exceed 2000 chars",
        },
    },
    sourceMaterial: {
        isLength: {
            options: { max: 2000 },
            errorMessage: "`notes` cannot exceed 2000 chars",
        },
    },
    haveMaterial: {
        isBoolean: true,
    },
    materialCutLength: {
        isLength: {
            options: { max: 250 },
            errorMessage: "`materialCutLength` cannot exceed 250 chars",
        },
    },
    quantityRequired: {
        isInt: true,
    },
};
//# sourceMappingURL=partsValidation.js.map