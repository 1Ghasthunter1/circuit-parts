"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const childrenSchema_1 = __importDefault(require("./schemas/childrenSchema"));
const parentSchema_1 = __importDefault(require("./schemas/parentSchema"));
const assemblySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    parent: parentSchema_1.default,
    children: [childrenSchema_1.default],
    path: [parentSchema_1.default],
    project: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "project",
        required: true,
    },
    partNumber: {
        type: String,
        required: true,
    },
    type: {
        required: true,
        type: String,
        enum: ["assembly"],
    },
    status: {
        type: String,
        required: true,
    },
    notes: { type: String, default: "" },
    priority: { type: String, required: true },
    creationDate: { type: Date, required: true },
});
assemblySchema.set("toJSON", {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transform: (_document, returnedObject) => {
        var _a;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        returnedObject.id = (_a = returnedObject._id) === null || _a === void 0 ? void 0 : _a.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
const AssemblyModel = mongoose_1.default.model("assembly", assemblySchema);
exports.default = AssemblyModel;
//# sourceMappingURL=assembly.js.map