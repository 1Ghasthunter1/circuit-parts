"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderItemSchema = new mongoose_1.default.Schema({
    order: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "order",
        required: true,
    },
    partNumber: {
        type: String,
        required: true,
    },
    vendorUrl: String,
    quantity: {
        type: Number,
        required: true,
    },
    description: String,
    unitCost: {
        type: Number,
        required: true,
    },
    notes: String,
});
orderItemSchema.set("toJSON", {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transform: (_document, returnedObject) => {
        var _a;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        returnedObject.id = (_a = returnedObject._id) === null || _a === void 0 ? void 0 : _a.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
const OrderItemModel = mongoose_1.default.model("orderItem", orderItemSchema);
exports.default = OrderItemModel;
//# sourceMappingURL=orderItem.js.map