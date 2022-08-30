"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editedAssemblySchema = exports.newAssemblySchema = void 0;
const universalTypes_1 = require("../types/universalTypes");
const assemblyTypes_1 = require("../types/assemblyTypes");
const mongoose_1 = require("mongoose");
exports.newAssemblySchema = {
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
                    throw new Error("parent.parent is reqiured");
                if (!(0, mongoose_1.isValidObjectId)(value))
                    throw new Error("parent.parent is not a valid mongoose id");
                return true;
            },
        },
    },
    project: {
        custom: {
            options: (value) => {
                return (0, mongoose_1.isValidObjectId)(value);
            },
            errorMessage: "project is not a valid mongoose object ID",
        },
    },
};
exports.editedAssemblySchema = {
    name: exports.newAssemblySchema.name,
    status: {
        isString: true,
        custom: {
            options: (value) => (0, assemblyTypes_1.isAssemblyStatus)(value),
            errorMessage: "field `status` must be an assembly status",
        },
    },
    priority: {
        isString: true,
        custom: {
            options: (value) => (0, universalTypes_1.isPriority)(value),
            errorMessage: "field `priority` must be an assembly status",
        },
    },
    notes: {
        isLength: {
            options: { max: 2000 },
            errorMessage: "notes cannot exceed 2000 chars",
        },
    },
};
//# sourceMappingURL=assemblyValidation.js.map