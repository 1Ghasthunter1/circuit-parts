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
exports.getPartById = exports.getParts = void 0;
const part_1 = __importDefault(require("../models/part"));
const getParts = () => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield part_1.default.find({});
    return resp;
});
exports.getParts = getParts;
const getPartById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const resp = yield part_1.default.findById(id);
    return resp;
});
exports.getPartById = getPartById;
//# sourceMappingURL=partsService.js.map