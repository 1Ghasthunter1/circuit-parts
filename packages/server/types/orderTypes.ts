import { Types } from "mongoose";
import { OrderStatus } from "./universalTypes";

export interface DatabaseOrderItem {
  id: Types.ObjectId;
  parentOrder: Types.ObjectId;
  quantity: number;
  partNumber: string;
  description: string;
  unitCost: number;
  notes: string;
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
