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
exports.populatePath = exports.getMultiplePartsForUser = exports.getPartForUser = exports.getMultiplePopulatedParts = exports.getPopulatedPart = exports.getMultipleAssysForUser = exports.getMultiplePopulatedAssys = exports.getAssyForUser = exports.getPopulatedAssy = void 0;
const assembly_1 = __importDefault(require("../models/assembly"));
const part_1 = __importDefault(require("../models/part"));
const project_1 = __importDefault(require("../models/project"));
//FOR ASSEMBLIES ======================================
const getPopulatedAssy = (assyId) => __awaiter(void 0, void 0, void 0, function* () {
    //This behemoth simply gets an assembly and populates parent.parent, children.child and project with Types!
    const foundAssembly = yield assembly_1.default.findById(assyId)
        .populate("parent.parent")
        .populate("children.child")
        .populate("project");
    return foundAssembly;
});
exports.getPopulatedAssy = getPopulatedAssy;
const getAssyForUser = (assyId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundAssembly = yield (0, exports.getPopulatedAssy)(assyId);
    if (!foundAssembly)
        return null;
    const populatedPath = yield (0, exports.populatePath)(foundAssembly.path);
    const modifiedAssembly = Object.assign(Object.assign({}, foundAssembly.toJSON()), { children: foundAssembly.children.map((childObj) => childObj.child), parent: foundAssembly.parent.parent, path: populatedPath });
    return modifiedAssembly;
});
exports.getAssyForUser = getAssyForUser;
const getMultiplePopulatedAssys = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const foundAssembly = yield assembly_1.default.find(query)
        .populate("parent.parent")
        .populate("project");
    return foundAssembly;
});
exports.getMultiplePopulatedAssys = getMultiplePopulatedAssys;
const getMultipleAssysForUser = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const foundAssemblies = yield (0, exports.getMultiplePopulatedAssys)(query);
    if (!foundAssemblies)
        return [];
    const modifiedAssemblies = foundAssemblies.map((assy) => (Object.assign(Object.assign({}, assy.toJSON()), { parent: assy.parent.parent })));
    return modifiedAssemblies;
});
exports.getMultipleAssysForUser = getMultipleAssysForUser;
//FOR PARTS ======================================
const getPopulatedPart = (partId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundPart = yield part_1.default.findById(partId)
        .populate("parent.parent")
        .populate("project");
    return foundPart;
});
exports.getPopulatedPart = getPopulatedPart;
const getMultiplePopulatedParts = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const foundPart = yield part_1.default.find(query)
        .populate("parent.parent")
        .populate("project");
    return foundPart;
});
exports.getMultiplePopulatedParts = getMultiplePopulatedParts;
const getPartForUser = (partId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundPart = yield (0, exports.getPopulatedPart)(partId);
    if (!foundPart)
        return null;
    const populatedPath = yield (0, exports.populatePath)(foundPart.path);
    const modifiedPart = Object.assign(Object.assign({}, foundPart.toJSON()), { parent: foundPart.parent.parent, path: populatedPath });
    return modifiedPart;
});
exports.getPartForUser = getPartForUser;
const getMultiplePartsForUser = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const foundParts = yield (0, exports.getMultiplePopulatedParts)(query);
    if (!foundParts)
        return [];
    const modifiedParts = foundParts.map((part) => (Object.assign(Object.assign({}, part.toJSON()), { parent: part.parent.parent })));
    return modifiedParts;
});
exports.getMultiplePartsForUser = getMultiplePartsForUser;
const populatePath = (path) => __awaiter(void 0, void 0, void 0, function* () {
    //Firstly, separate path objects by type
    const projectIds = path.reduce((projIds, pathItem) => {
        if (pathItem.parentType === "project")
            return projIds.concat(pathItem.parent);
        return projIds;
    }, []);
    const assemblyIds = path.reduce((assyIds, pathItem) => {
        if (pathItem.parentType === "assembly")
            return assyIds.concat(pathItem.parent);
        return assyIds;
    }, []);
    //query each individually
    const updatedProjects = yield project_1.default.find({
        _id: { $in: projectIds },
    }).select({ name: 1, _id: 1, type: 1 });
    const updatedAssemblies = yield assembly_1.default.find({
        _id: { $in: assemblyIds },
    }).select({ name: 1, _id: 1, type: 1 });
    //re-match with original order from path. THis is sort of redundant but its safe
    const populatedPath = path.reduce((popPath, pathItem) => {
        switch (pathItem.parentType) {
            case "assembly":
                const foundAssembly = updatedAssemblies.find((updatedAssy) => updatedAssy._id.toString() === pathItem.parent.toString());
                if (!foundAssembly)
                    throw new Error("fatal error in populatePath in utils");
                return popPath.concat({
                    id: foundAssembly._id,
                    name: foundAssembly.name,
                    type: foundAssembly.type,
                });
            case "project":
                const foundProject = updatedProjects.find((updatedProj) => {
                    return updatedProj._id.toString() === pathItem.parent.toString();
                });
                if (!foundProject)
                    throw new Error("fatal error in populatePath in utils");
                return popPath.concat({
                    id: foundProject._id,
                    name: foundProject.name,
                    type: foundProject.type,
                });
        }
    }, []);
    return populatedPath;
});
exports.populatePath = populatePath;
//# sourceMappingURL=population.js.map