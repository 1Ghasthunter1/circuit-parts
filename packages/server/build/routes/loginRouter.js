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
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const uuid_1 = require("uuid");
const config_1 = __importDefault(require("../utils/config"));
const userService_1 = require("../services/userService");
const loginRouter = express_1.default.Router();
loginRouter.post("/", (0, express_validator_1.body)("email").isEmail(), (0, express_validator_1.body)("password").isLength({ min: 6 }), ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = ((0, express_validator_1.matchedData)(req, {
        locations: ["body"],
        includeOptionals: true,
    }));
    const user = yield user_1.default.findOne({ email });
    if (!user)
        return res.status(401).json({ error: "invalid credentials" });
    const correctPassword = yield bcrypt_1.default.compare(password, user.hash);
    if (!correctPassword)
        return res.status(401).json({ error: "incorrect password" });
    const newRefreshToken = (0, uuid_1.v4)();
    const userForToken = {
        username: user.username,
        id: user._id,
    };
    const token = jsonwebtoken_1.default.sign(userForToken, process.env["SECRET"] || "RandomSecret!@@@Z===AS()_%)(!*", {
        expiresIn: config_1.default.ACCESS_TOKEN_EXPIRY,
    });
    const userToSend = {
        token,
        refreshToken: newRefreshToken,
        role: user.role,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        id: user._id,
    };
    user.refreshTokens = (0, userService_1.clearOldTokens)(user.refreshTokens).concat({
        token: newRefreshToken,
        creationDate: new Date(),
    });
    yield user.save();
    return res.status(200).send(userToSend);
})));
loginRouter.post("/signout", (0, express_validator_1.body)("refreshToken").isLength({ max: 255 }).exists(), (0, express_validator_1.body)("userId").isLength({ max: 255 }).exists(), ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { refreshToken, userId } = ((0, express_validator_1.matchedData)(req, {
        locations: ["body"],
        includeOptionals: true,
    }));
    const user = yield user_1.default.findOne({ _id: userId });
    if (!user)
        return res.status(404).json({ error: "user not found" });
    user.refreshTokens = (0, userService_1.clearOldTokens)(user.refreshTokens).filter((refreshTokenObj) => refreshTokenObj.token !== refreshToken);
    yield user.save();
    return res.status(204).end();
})));
exports.default = loginRouter;
//# sourceMappingURL=loginRouter.js.map