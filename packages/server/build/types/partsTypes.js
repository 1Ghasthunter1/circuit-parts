"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPartStatus = void 0;
const universalTypes_1 = require("./universalTypes");
const isPartStatus = (value) => {
    return universalTypes_1.partStatuses.includes(value);
};
exports.isPartStatus = isPartStatus;
//# sourceMappingURL=partsTypes.js.map