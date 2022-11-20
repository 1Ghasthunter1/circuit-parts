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
const order_1 = __importDefault(require("../models/order/order"));
const schemaValidation_1 = require("../utils/middleware/schemaValidation");
const express_validator_1 = require("express-validator");
const orderValidation_1 = require("../validation/orderValidation");
const orderItem_1 = __importDefault(require("../models/order/orderItem"));
const ordersService_1 = require("../services/ordersService");
const orderRouter = express_1.default.Router();
orderRouter.get("/", ((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_1.default.find({});
    return res.status(200).json(orders);
})));
orderRouter.get("/:id", ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const populatedOrder = yield (0, ordersService_1.getPopulatedOrder)(req.params.id);
    if (!populatedOrder)
        return res
            .status(404)
            .json({ errors: [{ message: "`order` does not exist" }] });
    return res.status(200).json(populatedOrder);
})));
orderRouter.post("/", (0, express_validator_1.checkSchema)(orderValidation_1.newOrderSchema), schemaValidation_1.handleSchemaErrors, ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newOrder = Object.assign(Object.assign({}, (0, schemaValidation_1.parseValidated)(req)), { creationDate: new Date() });
    const savedOrder = yield new order_1.default(newOrder).save();
    return res.status(200).json(savedOrder);
})));
orderRouter.post("/:id/items", (0, express_validator_1.param)("id").custom((value) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, ordersService_1.orderExists)(value);
    if (!res)
        return Promise.reject("`order` does not exist");
    return Promise.resolve();
})), (0, express_validator_1.checkSchema)(orderValidation_1.newOrderItemSchema), schemaValidation_1.handleSchemaErrors, ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderItemObj = Object.assign(Object.assign({}, (0, schemaValidation_1.parseValidated)(req)), { order: req.params.id });
    const savedOrderItem = yield new orderItem_1.default(orderItemObj).save();
    return res.status(200).json(savedOrderItem);
})));
orderRouter.delete("/:id", ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    const response = yield order_1.default.findByIdAndDelete(orderId);
    if (!response)
        return res.status(404).json("order not found");
    return res.status(204).end();
})));
orderRouter.delete("/items/:itemId", ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const itemId = req.params.itemId;
    const response = yield orderItem_1.default.findByIdAndDelete(itemId);
    if (!response)
        return res.status(404).json("order item not found");
    return res.status(204).end();
})));
orderRouter.put("/:id", (0, express_validator_1.checkSchema)(orderValidation_1.newOrderSchema), schemaValidation_1.handleSchemaErrors, ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const newOrder = Object.assign({}, (0, schemaValidation_1.parseValidated)(req));
    if (((_a = newOrder.tracking) === null || _a === void 0 ? void 0 : _a.carrier) || ((_b = newOrder.tracking) === null || _b === void 0 ? void 0 : _b.trackingNumber)) {
        if (!(((_c = newOrder.tracking) === null || _c === void 0 ? void 0 : _c.carrier) && ((_d = newOrder.tracking) === null || _d === void 0 ? void 0 : _d.trackingNumber)))
            return res.status(400).json("bad tracking request");
    }
    const orderId = req.params.id;
    const order = yield order_1.default.findByIdAndUpdate(orderId, newOrder, {
        new: true,
    });
    if (!order)
        return res.status(404).json({ errors: [{ error: "order not found" }] });
    return res.status(200).json(order);
})));
orderRouter.put("/items/:id", (0, express_validator_1.checkSchema)(orderValidation_1.newOrderItemSchema), schemaValidation_1.handleSchemaErrors, ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const modifiedOrderItem = Object.assign({}, (0, schemaValidation_1.parseValidated)(req));
    const orderItemId = req.params.id;
    const orderItem = yield orderItem_1.default.findByIdAndUpdate(orderItemId, modifiedOrderItem, {
        new: true,
    });
    if (!orderItem)
        return res.status(404).json({ errors: [{ error: "order not found" }] });
    return res.status(200).json(orderItem);
})));
exports.default = orderRouter;
//# sourceMappingURL=orderRouter.js.map