import Order from "../models/order/order";

export const getPopulatedOrder = async (orderId: string) => {
  return await Order.findById(orderId).populate("items");
};
