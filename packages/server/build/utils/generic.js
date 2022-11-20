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
exports.refactorParentAndChildren = exports.findProject = exports.findParent = void 0;
const assembly_1 = __importDefault(require("../models/assembly"));
const project_1 = __importDefault(require("../models/project"));
const findParent = (parentType, parentId) => __awaiter(void 0, void 0, void 0, function* () {
    let foundParent;
    if (parentType === "assembly")
        foundParent = yield assembly_1.default.findById(parentId);
    else if (parentType === "project")
        foundParent = yield project_1.default.findById(parentId);
    return foundParent;
});
exports.findParent = findParent;
const findProject = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield project_1.default.findById(projectId);
});
exports.findProject = findProject;
const refactorParentAndChildren = (mongoObj) => {
    let newObj;
    if ("children" in mongoObj)
        newObj = Object.assign(Object.assign({}, mongoObj), { children: mongoObj.children.map((child) => child.child) });
    else {
        newObj = mongoObj;
    }
    newObj = Object.assign(Object.assign({}, newObj), { parent: mongoObj.parent.parent });
    return newObj;
};
exports.refactorParentAndChildren = refactorParentAndChildren;
//# sourceMappingURL=generic.js.map