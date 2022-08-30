"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUserSchema = exports.updateUserSchema = void 0;
const universalTypes_1 = require("../types/universalTypes");
exports.updateUserSchema = {
    firstName: {
        isString: true,
        notEmpty: true,
        isLength: { options: { min: 1, max: 255 } },
        errorMessage: "First name must be string and between 1 and 255 chars",
    },
    lastName: {
        isString: true,
        notEmpty: true,
        isLength: { options: { min: 1, max: 255 } },
        errorMessage: "Last name must be string and between 1 and 255 chars",
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
        optional: true,
        isLength: { options: { min: 3, max: 255 } },
    },
    role: {
        isString: true,
        optional: true,
        custom: {
            options: (value) => (0, universalTypes_1.isUserRole)(value),
            errorMessage: "role must be user or admin",
        },
    },
};
exports.newUserSchema = Object.assign(Object.assign({}, exports.updateUserSchema), { password: {
        isString: true,
        isLength: { options: { min: 3, max: 255 } },
    } });
//# sourceMappingURL=userValidation.js.map