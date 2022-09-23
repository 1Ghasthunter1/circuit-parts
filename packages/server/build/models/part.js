"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const partsTypes_1 = require("../types/partsTypes");
const universalTypes_1 = require("../types/universalTypes");
const parentSchema_1 = __importDefault(require("./schemas/parentSchema"));
const partSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    partNumber: {
        type: String,
        required: true,
    },
    type: {
        required: true,
        type: String,
        enum: ["part"],
    },
    parent: parentSchema_1.default,
    path: [parentSchema_1.default],
    project: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "project",
        required: true,
    },
    status: {
        type: String,
        required: true,
        validate: {
            validator: (value) => (0, partsTypes_1.isPartStatus)(value),
            message: "`status` is not a valid part status",
        },
    },
    priority: {
        type: String,
        required: true,
        validate: {
            validator: (value) => (0, universalTypes_1.isPriority)(value),
            message: "`priority` is not a valid priority",
        },
    },
    creationDate: { type: Date, required: true },
    notes: { type: String, default: "" },
    sourceMaterial: { type: String, default: "" },
    haveMaterial: { type: Boolean, default: true },
    materialCutLength: { type: String, default: "" },
    quantityRequired: { type: Number, default: 1 },
});
partSchema.set("toJSON", {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transform: (_document, returnedObject) => {
        var _a;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        returnedObject.id = (_a = returnedObject._id) === null || _a === void 0 ? void 0 : _a.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
const PartModel = mongoose_1.default.model("part", partSchema);
exports.default = PartModel;
//# sourceMappingURL=part.js.map