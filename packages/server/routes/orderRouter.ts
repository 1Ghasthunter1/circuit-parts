import express, { RequestHandler } from "express";
import Order from "../models/order/order";
import {
  IValidatedOrder,
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
import { getPopulatedOrder, orderExists } from "../services/ordersService";
import mongoose from "mongoose";

const orderRouter = express.Router();

orderRouter.get("/", (async (_req, res) => {
  const orders = await Order.find({});
  return res.status(200).json(orders);
}) as RequestHandler);

orderRouter.get("/:id", (async (req, res) => {
  const populatedOrder = await getPopulatedOrder(req.params.id);

  if (!populatedOrder)
    return res
      .status(404)
      .json({ errors: [{ message: "`order` does not exist" }] });

  return res.status(200).json(populatedOrder);
}) as RequestHandler);

orderRouter.post("/", checkSchema(newOrderSchema), handleSchemaErrors, (async (
  req,
  res
) => {
  const newOrder: OrderToDB = {
    ...parseValidated<IValidatedOrder>(req),
    creationDate: new Date(),
    tracking: { carrier: "USPS", trackingNumber: "12345678" },
  };
  console.log(newOrder);
  const savedOrder = await new Order(newOrder).save();
  return res.status(200).json(savedOrder);
}) as RequestHandler);

orderRouter.post(
  "/:id/items",
  param("id").custom(async (value: string) => {
    const res = await orderExists(value);
    if (!res) return Promise.reject("`order` does not exist");
    return Promise.resolve();
  }),
  checkSchema(newOrderItemSchema),
  handleSchemaErrors,
  (async (req, res) => {
    const orderItemObj: OrderItemToDB = {
      ...parseValidated<OrderItemValidated>(req),
      order: req.params.id as unknown as mongoose.Types.ObjectId,
    };
    const savedOrderItem = await new OrderItem(orderItemObj).save();
    return res.status(200).json(savedOrderItem);
  }) as RequestHandler
);

export default orderRouter;
