import express, { RequestHandler } from "express";
import Order from "../models/order/order";
import { OrderToDB } from "../types/orderTypes";
import {
  parseValidated,
  handleSchemaErrors,
} from "../utils/middleware/schemaValidation";
import { checkSchema } from "express-validator";
import { newOrderSchema } from "../validation/orderValidation";

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

export default orderRouter;
