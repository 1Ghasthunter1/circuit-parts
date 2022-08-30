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
const partsValidation_1 = require("../validation/partsValidation");
const part_1 = __importDefault(require("../models/part"));
const generic_1 = require("../utils/generic");
const generatePartNumber_1 = require("../utils/partNumbers/generatePartNumber");
const assembly_1 = __importDefault(require("../models/assembly"));
const mongoose_1 = __importDefault(require("mongoose"));
const population_1 = require("../utils/population");
require("express-async-errors");
const partsRouter = express_1.default.Router();
partsRouter.get("/", ((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parts = yield part_1.default.find({});
    res.status(200).send(parts).end();
})));
partsRouter.get("/:id", ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const partId = req.params.id;
    const foundPart = yield (0, population_1.getPartForUser)(partId);
    if (!foundPart)
        return res.status(404).json({ error: `part not found with id ${partId}` });
    return res.status(200).json(foundPart);
})));
partsRouter.post("/", (0, express_validator_1.checkSchema)(partsValidation_1.newPartSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newPart = (0, express_validator_1.matchedData)(req, {
        locations: ["body"],
        includeOptionals: true,
    });
    const { parentType, parent } = newPart.parent;
    const foundParent = yield (0, generic_1.findParent)(parentType, parent);
    const foundProject = yield (0, generic_1.findProject)(newPart.project);
    if (!foundParent) {
        res
            .status(400)
            .json({
            error: `a(n) ${parentType} parent with id ${parent} does not exist`,
        })
            .end();
        return;
    }
    if (!foundProject) {
        res
            .status(400)
            .json({
            error: `'project' refers to an id ${newPart.project} does not exist`,
        })
            .end();
        return;
    }
    const partToDb = Object.assign(Object.assign({}, newPart), { status: "design in progress", partNumber: yield (0, generatePartNumber_1.generateNewPartNumber)(foundProject, foundParent, "part"), type: "part", priority: "low", creationDate: new Date() });
    const savedPart = yield new part_1.default(partToDb).save();
    foundParent.children = foundParent.children.concat({
        childType: "part",
        child: savedPart.toJSON().id,
    });
    yield foundParent.save();
    return res.json(savedPart).end();
}));
partsRouter.put("/:id", (0, express_validator_1.checkSchema)(partsValidation_1.editedPartSchema), ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const editedPart = (0, express_validator_1.matchedData)(req, {
        locations: ["body"],
        includeOptionals: true,
    });
    const currentPartId = req.params.id;
    const foundPart = yield part_1.default.findById(currentPartId);
    if (!foundPart)
        return res
            .status(404)
            .json({ error: `part not found with id ${currentPartId}` });
    foundPart.name = editedPart.name;
    foundPart.status = editedPart.status;
    foundPart.priority = editedPart.priority;
    foundPart.notes = editedPart.notes;
    foundPart.sourceMaterial = editedPart.sourceMaterial;
    foundPart.haveMaterial = editedPart.haveMaterial;
    foundPart.materialCutLength = editedPart.materialCutLength;
    foundPart.quantityRequired = editedPart.quantityRequired;
    yield foundPart.save();
    return res.status(204).end();
})));
partsRouter.delete("/:id", ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const partId = req.params.id;
    const foundPart = yield part_1.default.findById(partId);
    if (!foundPart)
        return res.status(404).json({ error: `part not found with id ${partId}` });
    yield assembly_1.default.findByIdAndUpdate(foundPart.parent.parent, {
        $pull: { children: { child: new mongoose_1.default.Types.ObjectId(partId) } },
    });
    yield foundPart.delete();
    return res.status(204).end();
})));
exports.default = partsRouter;
//# sourceMappingURL=partsRouter.js.map