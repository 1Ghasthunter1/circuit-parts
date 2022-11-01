import { OrderStatus } from "./universalTypes";

export interface OrderItem {
  id: string;
  order: string;
  partNumber: string;
  vendorUrl?: string;
  quantity: number;
  description?: string;
  unitCost: number;
  notes?: string;
}
export interface Order {
  id: string;
  project: string;
  status: OrderStatus;
  orderNumber: string;
  vendor: string;
  creationDate: Date;
  tracking?: {
    trackingNumber: string;
    carrier: string;
  };
  tax?: number;
  shipping?: number;
  purchaser?: string;
  reimbursed?: boolean;
  orderDate?: Date;
  notes?: string;
}

export interface PopulatedOrder extends Order {
  items: OrderItem[];
}

export type OrderToDB = Omit<Order, "id">;

export type OrderItemToServer = Omit<OrderItem, "id" | "order">;

export type IOrderToServer = Omit<Order, "id" | "creationDate">;
