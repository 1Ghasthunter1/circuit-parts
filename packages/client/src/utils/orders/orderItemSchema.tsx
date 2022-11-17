import { AnySchema, number, object, ObjectSchema, string } from "yup";
import { OrderItemToServer } from "~/types/orderTypes";

export const orderItemSchema: ObjectSchema<
  Record<keyof OrderItemToServer, AnySchema>
> = object({
  partNumber: string().required().defined(),
  quantity: number().integer().required().positive(),
  unitCost: number().required().min(0),
  vendorUrl: string().url(),
  description: string().max(255),
  notes: string().max(500),
});
