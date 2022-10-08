import { OrderStatus } from "./universalTypes";

export interface DatabaseOrderItem {
  id: string;
  order: string;
  partNumber: string;
  quantity?: number;
  description?: string;
  unitCost?: number;
  notes?: string;
}
export interface DatabaseOrder {
  id: string;
  project: string;
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

export interface PopulatedOrder extends DatabaseOrder {
  items: DatabaseOrderItem[];
}

export type OrderToDB = Omit<DatabaseOrder, "id">;

export type OrderItemToServer = Omit<DatabaseOrderItem, "id" | "order">;
