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
exports.getMultiplePartsForUser = exports.getPartForUser = exports.getMultiplePopulatedParts = exports.getPopulatedPart = exports.getMultipleAssysForUser = exports.getMultiplePopulatedAssys = exports.getAssyForUser = exports.getPopulatedAssy = void 0;
const assembly_1 = __importDefault(require("../models/assembly"));
const part_1 = __importDefault(require("../models/part"));
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
    const modifiedAssembly = Object.assign(Object.assign({}, foundAssembly.toJSON()), { children: foundAssembly.children.map((childObj) => childObj.child), parent: foundAssembly.parent.parent });
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
    const modifiedPart = Object.assign(Object.assign({}, foundPart.toJSON()), { parent: foundPart.parent.parent });
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
//# sourceMappingURL=population.js.map