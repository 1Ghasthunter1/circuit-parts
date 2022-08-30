"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const universalTypes_1 = require("../../types/universalTypes");
const childrenSchema = new mongoose_1.Schema({
    childType: {
        type: String,
        required: true,
        validate: {
            validator: (value) => (0, universalTypes_1.isChildType)(value),
            message: "`childType` is not a parent type",
        },
    },
    child: {
        type: mongoose_1.Types.ObjectId,
        refPath: "children.childType",
        required: true,
    },
}, { _id: false });
exports.default = childrenSchema;
//# sourceMappingURL=childrenSchema.js.map