import { Types } from "mongoose";
import { OrderStatus } from "./universalTypes";

export interface DatabaseOrderItem {
  id: Types.ObjectId;
  order: Types.ObjectId;
  partNumber: string;
  vendorUrl?: string;
  quantity?: number;
  description?: string;
  unitCost?: number;
  notes?: string;
}
export interface DatabaseOrder {
  id: Types.ObjectId;
  project: Types.ObjectId;
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

export interface PopulatedOrder extends DatabaseOrder {
  items: DatabaseOrderItem[];
}

export type OrderToDB = Omit<DatabaseOrder, "id">;

export type IValidatedOrder = Omit<DatabaseOrder, "id" | "creationDate">;

export type OrderItemToDB = Omit<DatabaseOrderItem, "id">;

export type OrderItemValidated = Omit<OrderItemToDB, "order">;
