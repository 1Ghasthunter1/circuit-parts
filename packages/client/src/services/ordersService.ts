import axios from "axios";
import { apiBaseUrl } from "~/constants";
import {
  IOrderToServer,
  Order,
  OrderItem,
  OrderItemToServer,
  PopulatedOrder,
} from "~/types/orderTypes";

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

export const updateOrder = async (order: Order) => {
  interface IOrderStringDate extends Omit<Order, "creationDate"> {
    creationDate: string;
  }
  const { data } = await axios.put<IOrderStringDate>(
    `${apiBaseUrl}/orders/${order.id}`,
    order
  );
  const updatedOrder: Order = {
    ...data,
    creationDate: new Date(data.creationDate),
  };

  return updatedOrder;
};

export const createOrderItem = async (
  orderId: string,
  orderItem: OrderItemToServer
) => {
  return await axios.post<OrderItem>(
    `${apiBaseUrl}/orders/${orderId}/items`,
    orderItem
  );
};

export const createOrder = async (orderToServer: IOrderToServer) => {
  return await axios.post<Order>(`${apiBaseUrl}/orders`, orderToServer);
};
