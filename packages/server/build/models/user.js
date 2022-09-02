"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const universalTypes_1 = require("../types/universalTypes");
const userSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: true,
        min: 1,
        max: 255,
    },
    lastName: {
        type: String,
        required: true,
        min: 1,
        max: 255,
    },
    username: {
        type: String,
        unique: true,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, "is invalid"],
        min: 3,
        max: 255,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, "is invalid"],
        min: 6,
        max: 255,
        index: true,
    },
    role: {
        type: String,
        enum: [...universalTypes_1.userRoles],
        required: true,
        errorMessage: "role must be either admin or user",
    },
    hash: { type: String, required: true },
});
userSchema.set("toJSON", {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transform: (_document, returnedObject) => {
        var _a;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        returnedObject.id = (_a = returnedObject._id) === null || _a === void 0 ? void 0 : _a.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.hash;
    },
});
const UserModel = mongoose_1.default.model("user", userSchema);
exports.default = UserModel;
//# sourceMappingURL=user.js.map