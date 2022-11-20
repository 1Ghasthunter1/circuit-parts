"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAssemblyStatus = void 0;
const universalTypes_1 = require("./universalTypes");
const isAssemblyStatus = (value) => {
    return universalTypes_1.assemblyStatuses.includes(value);
};
exports.isAssemblyStatus = isAssemblyStatus;
//# sourceMappingURL=assemblyTypes.js.map