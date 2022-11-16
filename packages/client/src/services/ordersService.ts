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

export const deleteOrderById = async (orderId: string) => {
  const response = await axios.delete<Order>(`${apiBaseUrl}/orders/${orderId}`);
  return response;
};

export const deleteOrderItemById = async (orderItemId: string) => {
  const response = await axios.delete<OrderItem>(
    `${apiBaseUrl}/orders/items/${orderItemId}`
  );
  return response;
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
  const out = await axios.post<OrderItem>(
    `${apiBaseUrl}/orders/${orderId}/items`,
    orderItem
  );
  return out;
};

export const calculateOrderTotals = (order: PopulatedOrder) => {
  const items = order.items;
  const subtotal = items.reduce((sum, item) => {
    return sum + item.quantity * item.unitCost;
  }, 0);
  return {
    subtotal,
    total: subtotal + (order.shipping || 0) + (order.tax || 0),
  };
};

export const createOrder = async (orderToServer: IOrderToServer) => {
  return await axios.post<Order>(`${apiBaseUrl}/orders`, orderToServer);
};
