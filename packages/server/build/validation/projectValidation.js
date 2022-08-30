"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newProjectSchema = void 0;
exports.newProjectSchema = {
    name: {
        isString: true,
        errorMessage: "Name must be string",
    },
    prefix: {
        isString: true,
        errorMessage: "prefix must be string",
    },
    description: {
        isString: true,
        isLength: {
            errorMessage: "description can be no more than 100 characters",
            options: { max: 100 },
        },
        errorMessage: "bad description",
        optional: true,
    },
};
//# sourceMappingURL=projectValidation.js.map