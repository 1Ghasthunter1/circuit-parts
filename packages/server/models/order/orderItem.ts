import mongoose from "mongoose";
import { DatabaseOrderItem } from "../../types/orderTypes";
const orderItemSchema = new mongoose.Schema<DatabaseOrderItem>({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "order",
    required: true,
  },
  partNumber: {
    type: String,
    required: true,
  },
  vendorUrl: String,
  quantity: Number,
  description: String,
  unitCost: Number,
  notes: String,
});

orderItemSchema.set("toJSON", {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform: (_document: any, returnedObject: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const OrderItemModel = mongoose.model("orderItem", orderItemSchema);

export default OrderItemModel;
