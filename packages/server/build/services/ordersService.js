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
exports.orderExists = exports.getPopulatedOrder = void 0;
const order_1 = __importDefault(require("../models/order/order"));
const orderItem_1 = __importDefault(require("../models/order/orderItem"));
const getPopulatedOrder = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_1.default.findById(orderId);
    if (!order)
        return null;
    const orderItems = yield orderItem_1.default.find({ order: orderId });
    return Object.assign(Object.assign({}, order.toJSON()), { items: orderItems });
});
exports.getPopulatedOrder = getPopulatedOrder;
const orderExists = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield order_1.default.findById(orderId);
    if (!res)
        return false;
    return true;
});
exports.orderExists = orderExists;
//# sourceMappingURL=ordersService.js.map