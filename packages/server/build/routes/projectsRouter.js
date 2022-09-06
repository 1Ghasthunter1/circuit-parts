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
const projectValidation_1 = require("../validation/projectValidation");
const population_1 = require("../utils/population");
const project_1 = __importDefault(require("../models/project"));
const part_1 = __importDefault(require("../models/part"));
const assembly_1 = __importDefault(require("../models/assembly"));
const middleware_1 = require("../utils/middleware/middleware");
require("express-async-errors");
const projectsRouter = express_1.default.Router();
projectsRouter.get("/", ((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield project_1.default.find({});
    res.send(projects).end();
})));
projectsRouter.post("/", middleware_1.adminRequired, (0, express_validator_1.checkSchema)(projectValidation_1.newProjectSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newProject = (0, express_validator_1.matchedData)(req, {
        locations: ["body"],
        includeOptionals: true,
    });
    const projectToDb = Object.assign(Object.assign({}, newProject), { creationDate: new Date(), type: "project", children: [] });
    const savedProject = yield new project_1.default(projectToDb).save();
    return res.status(201).json(savedProject).end();
}));
projectsRouter.get("/:id", ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = req.params.id;
    const foundProject = yield project_1.default.findById(projectId).populate("children.child");
    if (!foundProject)
        return res
            .status(404)
            .json({ error: `project not found with id ${projectId}` });
    return res
        .status(200)
        .send(Object.assign(Object.assign({}, foundProject.toJSON()), { children: foundProject.children.map((childObj) => childObj.child) }))
        .end();
})));
projectsRouter.get("/:id/components", ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = req.params.id;
    const foundProject = yield project_1.default.findById(projectId);
    if (!foundProject)
        return res
            .status(404)
            .json({ error: `project not found with id ${projectId}` });
    const parts = yield (0, population_1.getMultiplePartsForUser)({ project: projectId });
    const assemblies = yield (0, population_1.getMultipleAssysForUser)({
        project: projectId,
    });
    const respJson = [...parts, ...assemblies];
    return res.status(200).send(respJson).end();
})));
projectsRouter.delete("/:id", middleware_1.adminRequired, ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = req.params.id;
    const foundProject = yield project_1.default.findById(projectId);
    if (!foundProject)
        return res
            .status(404)
            .json({ error: `project not found with id ${projectId}` });
    yield part_1.default.deleteMany({ project: projectId });
    yield assembly_1.default.deleteMany({
        project: projectId,
    });
    yield foundProject.delete();
    return res.status(204).end();
})));
exports.default = projectsRouter;
//# sourceMappingURL=projectsRouter.js.map