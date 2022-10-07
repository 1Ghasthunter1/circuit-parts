import { Types } from "mongoose";
import { OrderStatus } from "./universalTypes";

export interface DatabaseOrderItem {
  id: Types.ObjectId;
  order: Types.ObjectId;
  partNumber: string;
  quantity?: number;
  description?: string;
  unitCost?: number;
  notes?: string;
}

export interface DatabaseOrder {
  id: Types.ObjectId;
  project: Types.ObjectId;
  items?: Types.ObjectId[];
  status: OrderStatus;
  vendor: string;
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

export type OrderToDB = Omit<DatabaseOrder, "id">;

export type OrderItemToDB = Omit<DatabaseOrderItem, "id">;

export type OrderItemValidated = Omit<OrderItemToDB, "order">;
