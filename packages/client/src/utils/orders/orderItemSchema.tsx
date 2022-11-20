import { AnySchema, number, object, ObjectSchema, string } from "yup";
import { OrderItemToServer } from "~/types/orderTypes";

export const orderItemSchema: ObjectSchema<
  Record<keyof OrderItemToServer, AnySchema>
> = object({
  partNumber: string().max(255, "Too Long!").required("Required").defined(),
  quantity: number().integer().required().positive(),
  unitCost: number().required().min(0),
  vendorUrl: string().url(),
  description: string().max(255),
  notes: string().max(500),
});

export const OrderItemPNSchema = object().shape({
  partNumber: string().max(255, "Too long!").required("Required").defined(),
  vendorUrl: string().url("Must be a valid URL").max(1000, "Too long!"),
});
