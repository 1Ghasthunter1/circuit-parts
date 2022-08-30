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
exports.errorHandler = exports.adminRequired = exports.userExtractor = exports.tokenExtractor = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../../models/user"));
const tokenExtractor = (req, _res, next) => {
    const authorization = req.get("authorization");
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        req.token = authorization.substring(7);
    }
    next();
};
exports.tokenExtractor = tokenExtractor;
// eslint-disable-next-line @typescript-eslint/no-misused-promises
const userExtractor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("thin");
    if (!req.token) {
        return res.status(401).json({ error: "token missing" });
    }
    const decodedToken = jsonwebtoken_1.default.verify(req.token, process.env["SECRET"]);
    if (!decodedToken.id) {
        return res.status(401).json({ error: "token invalid" });
    }
    const user = yield user_1.default.findById(decodedToken.id);
    req.user = user || undefined;
    return next();
});
exports.userExtractor = userExtractor;
const adminRequired = (req, res, next) => {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "admin")
        return res.status(403).json({ error: "forbidden" });
    return next();
};
exports.adminRequired = adminRequired;
const errorHandler = (error, _request, response, next) => {
    if (error.name === "ValidationError") {
        return response.status(400).send({ error: error.message });
    }
    else if (error.name === "JsonWebTokenError") {
        return response.status(403).send({ error: error.message });
    }
    else if (error.name === "TokenExpiredError") {
        return response.status(403).send({ error: error.message });
    }
    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    }
    else if (error.code === 11000) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const duplicateThing = Object.keys(error.keyPattern)[0];
        return response
            .status(409)
            .json({ error: `${duplicateThing} must be unique` });
    }
    next(error);
    return;
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=middleware.js.map