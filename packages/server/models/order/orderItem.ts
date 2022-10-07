import mongoose from "mongoose";
import { DatabaseOrderItem } from "../../types/orderTypes";
const orderItemSchema = new mongoose.Schema<DatabaseOrderItem>({
  parentOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "order",
    required: true,
  },
  vendor: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  partNumber: {
    type: String,
    required: true,
  },
  description: {
    required: true,
    type: String,
    enum: ["project"],
  },
  unitCost: { type: Number, default: 0 },
  notes: {
    required: true,
    type: String,
    enum: ["project"],
  },
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

const OrderItemSchema = mongoose.model("orderItem", orderItemSchema);

export default OrderItemSchema;
