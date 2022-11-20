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
const assemblyValidation_1 = require("../validation/assemblyValidation");
const assembly_1 = __importDefault(require("../models/assembly"));
const generic_1 = require("../utils/generic");
const generatePartNumber_1 = require("../utils/partNumbers/generatePartNumber");
const part_1 = __importDefault(require("../models/part"));
const project_1 = __importDefault(require("../models/project"));
const mongoose_1 = require("mongoose");
const population_1 = require("../utils/population");
require("express-async-errors");
const assemblyRouter = express_1.default.Router();
assemblyRouter.get("/", ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchQuery = req.query.project ? { project: req.query.project } : {};
    const assemblies = yield assembly_1.default.find(searchQuery);
    res.status(200).send(assemblies).end();
})));
assemblyRouter.get("/:id", ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const assemblyId = req.params.id;
    const assembly = yield (0, population_1.getAssyForUser)(assemblyId);
    if (!assembly)
        return res
            .status(404)
            .json({ error: `assembly not found with id ${assemblyId}` });
    return res.status(200).send(assembly).end();
})));
assemblyRouter.get("/:id/components", ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const assemblyId = req.params.id;
    const foundAssembly = yield assembly_1.default.findById(assemblyId);
    if (!foundAssembly)
        return res
            .status(404)
            .json({ error: `assembly not found with id ${assemblyId}` });
    const parts = yield (0, population_1.getMultiplePartsForUser)({ "parent.parent": assemblyId });
    const assemblies = yield (0, population_1.getMultipleAssysForUser)({
        "parent.parent": assemblyId,
    });
    const resData = [...parts, ...assemblies];
    return res.status(200).send(resData).end();
})));
assemblyRouter.post("/", (0, express_validator_1.checkSchema)(assemblyValidation_1.newAssemblySchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newAssembly = (0, express_validator_1.matchedData)(req, {
        locations: ["body"],
        includeOptionals: true,
    });
    const { parentType, parent } = newAssembly.parent;
    const foundParent = yield (0, generic_1.findParent)(parentType, parent);
    const foundProject = yield (0, generic_1.findProject)(newAssembly.project);
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
            .json({
            error: `'project' refers to an id ${newAssembly.project} does not exist`,
        })
            .status(400)
            .end();
        return;
    }
    const newPath = foundParent.type === "assembly"
        ? foundParent.path.concat(newAssembly.parent)
        : [newAssembly.parent];
    const newAssemblyObj = Object.assign(Object.assign({}, newAssembly), { status: "design in progress", partNumber: yield (0, generatePartNumber_1.generateNewPartNumber)(foundProject, foundParent, "assembly"), path: newPath, type: "assembly", priority: "normal", creationDate: new Date() });
    const savedAssembly = yield new assembly_1.default(newAssemblyObj).save();
    foundParent.children = foundParent.children.concat({
        childType: "assembly",
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        child: savedAssembly.id,
    });
    yield foundParent.save();
    return res.json(savedAssembly).end();
}));
assemblyRouter.put("/:id", (0, express_validator_1.checkSchema)(assemblyValidation_1.editedAssemblySchema), ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const editedAssembly = (0, express_validator_1.matchedData)(req, {
        locations: ["body"],
        includeOptionals: true,
    });
    const currentAssemblyId = req.params.id;
    const foundAssembly = yield assembly_1.default.findById(currentAssemblyId);
    if (!foundAssembly)
        return res
            .status(404)
            .json({ error: `part not found with id ${currentAssemblyId}` });
    foundAssembly.name = editedAssembly.name;
    foundAssembly.status = editedAssembly.status;
    foundAssembly.priority = editedAssembly.priority;
    foundAssembly.notes = editedAssembly.notes;
    yield foundAssembly.save();
    return res.status(204).end();
})));
assemblyRouter.delete("/:id", ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const assemblyId = req.params.id;
    const assembly = yield assembly_1.default.findById(assemblyId);
    if (!assembly)
        return res.status(404).end();
    const parts = yield part_1.default.find({
        "parent.parent": new mongoose_1.Types.ObjectId(assemblyId),
    });
    const assemblies = yield assembly_1.default.find({
        "parent.parent": new mongoose_1.Types.ObjectId(assemblyId),
    });
    if (parts.length !== 0 || assemblies.length !== 0) {
        return res.status(409).json({
            error: {
                content: `can't delete assembly with id ${assemblyId} because it has existing children`,
                type: "HAS_CHILDREN",
                children: [...parts, ...assemblies],
            },
        });
    }
    yield project_1.default.findByIdAndUpdate(assembly.parent.parent, {
        $pull: { children: { child: new mongoose_1.Types.ObjectId(assemblyId) } },
    });
    yield assembly.delete();
    return res.status(204).end();
})));
exports.default = assemblyRouter;
//# sourceMappingURL=assemblyRouter.js.map