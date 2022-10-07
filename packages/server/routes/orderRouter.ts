import express, { RequestHandler } from "express";
import Order from "../models/order/order";
import {
  OrderItemToDB,
  OrderItemValidated,
  OrderToDB,
} from "../types/orderTypes";
import {
  parseValidated,
  handleSchemaErrors,
} from "../utils/middleware/schemaValidation";
import { checkSchema, param } from "express-validator";
import {
  newOrderSchema,
  newOrderItemSchema,
} from "../validation/orderValidation";
import OrderItem from "../models/order/orderItem";
import { orderExists } from "../services/ordersService";
import mongoose from "mongoose";

const orderRouter = express.Router();

orderRouter.get("/", (async (_req, res) => {
  const orders = await Order.find({});
  return res.status(200).json(orders);
}) as RequestHandler);

orderRouter.post("/", checkSchema(newOrderSchema), handleSchemaErrors, (async (
  req,
  res
) => {
  const newOrder = parseValidated<OrderToDB>(req);
  const savedOrder = await new Order(newOrder).save();
  return res.status(200).json(savedOrder);
}) as RequestHandler);

orderRouter.post(
  "/:id/items",
  param("id")
    .custom((value: string) => orderExists(value))
    .withMessage("`order` does not exist"),
  checkSchema(newOrderItemSchema),
  handleSchemaErrors,
  (async (req, res) => {
    const orderId = req.params.id as unknown as mongoose.Types.ObjectId;
    const newOrderItem = parseValidated<OrderItemValidated>(req);
    const orderItemObj: OrderItemToDB = { ...newOrderItem, order: orderId };
    const savedOrderItem = await new OrderItem(orderItemObj).save();
    return res.status(200).json(savedOrderItem);
  }) as RequestHandler
);

export default orderRouter;
