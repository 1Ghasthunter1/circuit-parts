import Order from "../models/order/order";
import OrderItemModel from "../models/order/orderItem";
import { PopulatedOrder } from "../types/orderTypes";

export const getPopulatedOrder = async (orderId: string) => {
  const order = await Order.findById(orderId);
  if (!order) return null;
  const orderItems = await OrderItemModel.find({ order: orderId });
  return { ...order.toJSON(), items: orderItems } as PopulatedOrder;
};

export const orderExists = async (orderId: string) => {
  const res = await Order.findById(orderId);
  if (!res) return false;
  return true;
};
