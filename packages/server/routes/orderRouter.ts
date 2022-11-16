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
  };
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

orderRouter.delete("/:id", (async (req, res) => {
  const orderId = req.params.id;
  const response = await Order.findByIdAndDelete(orderId);

  if (!response) return res.status(404).json("order not found");
  return res.status(204).end();
}) as RequestHandler);

orderRouter.delete("/items/:itemId", (async (req, res) => {
  const itemId = req.params.itemId;
  const response = await OrderItem.findByIdAndDelete(itemId);

  if (!response) return res.status(404).json("order item not found");
  return res.status(204).end();
}) as RequestHandler);

orderRouter.put(
  "/:id",
  checkSchema(newOrderSchema),
  handleSchemaErrors,
  (async (req, res) => {
    const newOrder: IValidatedOrder = {
      ...parseValidated<IValidatedOrder>(req),
    };
    if (newOrder.tracking?.carrier || newOrder.tracking?.trackingNumber) {
      if (!(newOrder.tracking?.carrier && newOrder.tracking?.trackingNumber))
        return res.status(400).json("bad tracking request");
    }
    const orderId = req.params.id as unknown as mongoose.Types.ObjectId;
    const order = await Order.findByIdAndUpdate(orderId, newOrder, {
      new: true,
    });

    if (!order)
      return res.status(404).json({ errors: [{ error: "order not found" }] });

    return res.status(200).json(order);
  }) as RequestHandler
);

export default orderRouter;
