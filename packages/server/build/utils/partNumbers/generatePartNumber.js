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
exports.generateNewPartNumber = void 0;
const part_1 = __importDefault(require("../../models/part"));
const assembly_1 = __importDefault(require("../../models/assembly"));
const parsePN = (partNumberToParse) => {
    const secondToLastDelimiter = partNumberToParse.lastIndexOf("-", partNumberToParse.lastIndexOf("-") - 1); //takes last two items from string, AKA -P-1234
    const projectPrefix = partNumberToParse.slice(0, secondToLastDelimiter);
    const identifier = partNumberToParse.slice(secondToLastDelimiter, partNumberToParse.length);
    const [, componentType, fourDigitPN] = identifier.split("-");
    const sequentialAssyNumber = parseInt(fourDigitPN.substring(0, 2));
    const sequentialPartNumber = parseInt(fourDigitPN.substring(2, 4));
    if (componentType === "A" && sequentialPartNumber > 0)
        throw new Error("assembly component cannot have sequential part number greater than 0");
    if (componentType !== "A" && componentType !== "P")
        throw new Error("component type is not A or P");
    return {
        projectPrefix,
        sequentialAssyNumber,
        sequentialPartNumber,
        componentType,
    };
};
const twoDigitNumToStr = (input) => {
    if (input > 99)
        throw new Error("two digit number to string must be less than 100");
    return input.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    });
};
const generateNewPartNumber = (project, parent, type) => __awaiter(void 0, void 0, void 0, function* () {
    let typeLetter, seqAN, seqPN;
    if (type === "assembly") {
        typeLetter = "A";
        const assembliesInProject = yield assembly_1.default.find({
            project: project.id,
        });
        const addSeqAssemblyIds = assembliesInProject.reduce((ANs, currentAssembly) => {
            const seqANReducer = parsePN(currentAssembly.partNumber).sequentialAssyNumber;
            return [...ANs, seqANReducer];
        }, []);
        if (addSeqAssemblyIds.length > 0)
            seqAN = twoDigitNumToStr(Math.max(...addSeqAssemblyIds) + 1);
        else
            seqAN = "00";
    }
    else if (type === "part" && parent.type === "assembly") {
        //parent must be an assembly and we know we are making a part, so we will search for all parts with given parent ID
        typeLetter = "P";
        seqAN = twoDigitNumToStr(parsePN(parent.partNumber).sequentialAssyNumber);
        const partsInAssembly = yield part_1.default.find({
            "parent.parent": parent.id,
        });
        const allSeqPartIds = partsInAssembly.reduce((PNs, currentPart) => {
            const seqPNRecucer = parsePN(currentPart.partNumber).sequentialPartNumber;
            return [...PNs, seqPNRecucer];
        }, []);
        if (allSeqPartIds.length > 0)
            seqPN = twoDigitNumToStr(Math.max(...allSeqPartIds) + 1);
        else
            seqPN = "01";
    }
    else
        throw new Error(`cannot make "${type}" part number if it is a child of ${parent.type}.`);
    return `${project.prefix}-${typeLetter}-${seqAN || "00"}${seqPN || "00"}`;
});
exports.generateNewPartNumber = generateNewPartNumber;
//# sourceMappingURL=generatePartNumber.js.map