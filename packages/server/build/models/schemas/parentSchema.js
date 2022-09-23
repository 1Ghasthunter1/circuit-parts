"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const universalTypes_1 = require("../../types/universalTypes");
const parentSchema = new mongoose_1.Schema({
    parentType: {
        type: String,
        required: true,
        validate: {
            validator: (value) => (0, universalTypes_1.isParentType)(value),
            message: "`parent.parentType` is not a parent type",
        },
    },
    parent: {
        type: mongoose_1.Types.ObjectId,
        refPath: "parent.parentType",
        required: true,
    },
}, { _id: false });
exports.default = parentSchema;
//# sourceMappingURL=parentSchema.js.map