import axios from "axios";
import { apiBaseUrl } from "~/constants";
import { Order } from "~/types/orderTypes";

export const fetchOrders = async (projectId: string) => {
  interface IDbOrderStringDate extends Omit<Order, "creationDate"> {
    creationDate: string;
  }
  const { data } = await axios.get<IDbOrderStringDate[]>(
    `${apiBaseUrl}/projects/${projectId}/orders`
  );
  return data.map((order) => {
    const newOrder: Order = {
      ...order,
      creationDate: new Date(order.creationDate),
    };
    return newOrder;
  });
};
