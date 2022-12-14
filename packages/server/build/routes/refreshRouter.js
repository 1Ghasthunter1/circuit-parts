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
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const uuid_1 = require("uuid");
const config_1 = __importDefault(require("../utils/config"));
const userService_1 = require("../services/userService");
const refreshRouter = express_1.default.Router();
refreshRouter.post("/", (0, express_validator_1.body)("refreshToken").isString().isLength({ max: 255 }), ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { refreshToken } = (0, express_validator_1.matchedData)(req, {
        locations: ["body"],
        includeOptionals: true,
    });
    const user = yield user_1.default.findOne({
        refreshTokens: { $elemMatch: { token: refreshToken } },
    });
    if (!user) {
        return res.status(401).json({ error: "invalid refresh token" });
    }
    const existingTokenObject = user.refreshTokens.find((tokenObj) => tokenObj.token === refreshToken);
    if (!existingTokenObject) {
        return res.status(401).json({ error: "invalid refresh token" });
    }
    const expireTime = config_1.default.REFRESH_TOKEN_EXPIRY;
    if (new Date().getTime() - existingTokenObject.creationDate.getTime() >
        expireTime) {
        user.refreshTokens = (0, userService_1.clearOldTokens)(user.refreshTokens);
        yield user.save();
        return res.status(401).json({ error: "refresh token expired" });
    }
    const newRefreshToken = (0, uuid_1.v4)();
    user.refreshTokens = (0, userService_1.clearOldTokens)(user.refreshTokens).map((tokenObj) => {
        if (tokenObj.token === refreshToken) {
            return { token: newRefreshToken, creationDate: new Date() };
        }
        return tokenObj;
    });
    yield user.save();
    const userForToken = {
        username: user.username,
        id: user._id,
    };
    const token = jsonwebtoken_1.default.sign(userForToken, process.env["SECRET"] || "RandomSecret!@@@Z===AS()_%)(!*", {
        expiresIn: config_1.default.ACCESS_TOKEN_EXPIRY,
    });
    const tokenDataToSend = {
        token,
        refreshToken: newRefreshToken,
    };
    return res.status(200).send(tokenDataToSend);
})));
exports.default = refreshRouter;
//# sourceMappingURL=refreshRouter.js.map