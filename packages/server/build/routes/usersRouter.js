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
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const userValidation_1 = require("../validation/userValidation");
const middleware_1 = require("../utils/middleware/middleware");
const usersRouter = express_1.default.Router();
usersRouter.get("/", middleware_1.adminRequired, ((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield user_1.default.find({});
    res.status(200).json(allUsers);
})));
usersRouter.get("/:id", ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = req.user;
    const userIdToFind = req.params.id;
    if (!currentUser)
        return res.status(500).end();
    if (currentUser.id !== userIdToFind && currentUser.role !== "admin")
        return res.status(403).end();
    const responseUser = yield user_1.default.findById(userIdToFind);
    if (!responseUser)
        return res.status(404).end();
    return res.status(200).json(responseUser);
})));
usersRouter.put("/:id/changepassword", (0, express_validator_1.body)("oldPassword").isLength({ min: 6, max: 255 }), (0, express_validator_1.body)("newPassword").isLength({ min: 6, max: 255 }), ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const currentUser = req.user;
    const userIdToFind = req.params.id;
    if (!currentUser)
        return res.status(500).end();
    if (currentUser.id !== userIdToFind && currentUser.role !== "admin")
        return res.status(403).end();
    const { oldPassword, newPassword } = (0, express_validator_1.matchedData)(req, {
        locations: ["body"],
        includeOptionals: true,
    });
    const userToChange = yield user_1.default.findById(userIdToFind);
    if (!userToChange)
        return res.status(404).json({ error: "user not found" });
    const passwordCorrect = userToChange === null
        ? false
        : yield bcrypt_1.default.compare(oldPassword, userToChange.hash);
    if (!passwordCorrect)
        return res.status(403).json({ error: "original password is incorrect" });
    userToChange.hash = yield bcrypt_1.default.hash(newPassword, 10);
    yield userToChange.save();
    return res.status(204).json(userToChange);
})));
usersRouter.delete("/:id", middleware_1.adminRequired, ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield user_1.default.findByIdAndDelete(id);
    if (!user)
        return res.status(404).end();
    return res.status(204).json(user);
})));
usersRouter.post("/", (0, express_validator_1.checkSchema)(userValidation_1.newUserSchema), ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newUser = (0, express_validator_1.matchedData)(req, {
        locations: ["body"],
        includeOptionals: true,
    });
    const passwordHash = yield bcrypt_1.default.hash(newUser.password, 10);
    const newUserObject = {
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role,
        refreshTokens: [],
        hash: passwordHash,
    };
    const user = yield new user_1.default(newUserObject).save();
    return res.status(200).json(user);
})));
usersRouter.put("/:id", (0, express_validator_1.checkSchema)(userValidation_1.updateUserSchema), ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = req.params.id;
    const currentUser = req.user;
    const oldUser = yield user_1.default.findById(id);
    if (!oldUser)
        return res.status(404).json({ error: "user not found" });
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const modifiedUser = (0, express_validator_1.matchedData)(req, {
        locations: ["body"],
        includeOptionals: true,
    });
    if (currentUser.role === "admin" || currentUser.role === "owner") {
        oldUser.username = modifiedUser.username;
        oldUser.firstName = modifiedUser.firstName;
        oldUser.lastName = modifiedUser.lastName;
        oldUser.email = modifiedUser.email;
        oldUser.role = (_a = modifiedUser.role) !== null && _a !== void 0 ? _a : oldUser.role;
        if (modifiedUser.password)
            oldUser.hash = yield bcrypt_1.default.hash(modifiedUser.password, 10);
    }
    else {
        oldUser.username = modifiedUser.username;
        oldUser.firstName = modifiedUser.firstName;
        oldUser.lastName = modifiedUser.lastName;
        oldUser.email = modifiedUser.email;
        if (oldUser.role !== modifiedUser.role || modifiedUser.password)
            return res.status(403).json({
                error: "cannot change role or change other user's password without satisfied perms",
            });
    }
    const user = yield oldUser.save();
    return res.status(200).json(user);
})));
exports.default = usersRouter;
//# sourceMappingURL=usersRouter.js.map