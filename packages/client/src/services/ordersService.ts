import axios from "axios";
import { apiBaseUrl } from "~/constants";
import { Order, PopulatedOrder } from "~/types/orderTypes";

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

export const fetchOrder = async (orderId: string) => {
  interface IPopulatedOrderStringDate
    extends Omit<PopulatedOrder, "creationDate"> {
    creationDate: string;
  }
  const { data } = await axios.get<IPopulatedOrderStringDate>(
    `${apiBaseUrl}/orders/${orderId}`
  );
  const newOrder: PopulatedOrder = {
    ...data,
    creationDate: new Date(data.creationDate),
  };

  return newOrder;
};
