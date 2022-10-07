import Order from "../models/order/order";

export const getPopulatedOrder = async (orderId: string) => {
  return await Order.findById(orderId).populate("items");
};

export const orderExists = async (orderId: string) => {
  console.log(orderId);
  const res = await Order.findById(orderId);
  console.log(res);
  if (!res) return false;
  return true;
};
