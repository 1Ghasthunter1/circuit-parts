"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = exports.isString = void 0;
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
exports.isString = isString;
const isNumber = (value) => {
    return typeof Number(value) === "number" && !isNaN(Number(value));
};
exports.isNumber = isNumber;
//# sourceMappingURL=validations.js.map