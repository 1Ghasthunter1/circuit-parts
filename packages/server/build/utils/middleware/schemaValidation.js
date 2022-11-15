"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSchemaErrors = exports.parseValidated = void 0;
const express_validator_1 = require("express-validator");
const parseValidated = (req) => {
    const parsedData = (0, express_validator_1.matchedData)(req, {
        locations: ["body"],
        includeOptionals: true,
    });
    return parsedData;
};
exports.parseValidated = parseValidated;
const handleSchemaErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    return next();
};
exports.handleSchemaErrors = handleSchemaErrors;
//# sourceMappingURL=schemaValidation.js.map