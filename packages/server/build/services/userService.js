"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenExpired = exports.clearOldTokens = void 0;
const config_1 = __importDefault(require("../utils/config"));
const clearOldTokens = (tokenObjList) => {
    return tokenObjList.filter((tokenObj) => !(0, exports.tokenExpired)(tokenObj));
};
exports.clearOldTokens = clearOldTokens;
const tokenExpired = (tokenObj) => {
    return (new Date().getTime() - tokenObj.creationDate.getTime() >
        config_1.default.REFRESH_TOKEN_EXPIRY);
};
exports.tokenExpired = tokenExpired;
//# sourceMappingURL=userService.js.map