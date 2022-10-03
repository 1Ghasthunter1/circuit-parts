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
exports.initializeUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const initializeUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const existingUsers = yield user_1.default.find({});
    if (existingUsers.length !== 0) {
        return;
    }
    const passwordHash = yield bcrypt_1.default.hash("password", 10);
    const newUserObject = {
        username: "CircuitAdmin",
        firstName: "Circuit",
        lastName: "Admin",
        email: "circuitadmin@team696.org",
        role: "admin",
        refreshToken: { token: "", creationDate: new Date() },
        hash: passwordHash,
    };
    yield new user_1.default(newUserObject).save();
});
exports.initializeUsers = initializeUsers;
//# sourceMappingURL=serverInitialization.js.map