"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const universalTypes_1 = require("../../types/universalTypes");
const orderSchema = new mongoose_1.default.Schema({
    project: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "project",
        required: true,
    },
    orderNumber: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: [...universalTypes_1.orderStatuses],
    },
    vendor: {
        type: String,
        required: true,
    },
    creationDate: {
        type: Date,
        required: true,
    },
    tracking: {
        carrier: { type: String },
        trackingNumber: { type: String },
    },
    tax: Number,
    shipping: Number,
    purchaser: String,
    reimbursed: Boolean,
    orderDate: Date,
    notes: String,
});
orderSchema.set("toJSON", {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transform: (_document, returnedObject) => {
        var _a;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        returnedObject.id = (_a = returnedObject._id) === null || _a === void 0 ? void 0 : _a.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
const Order = mongoose_1.default.model("order", orderSchema);
exports.default = Order;
//# sourceMappingURL=order.js.map