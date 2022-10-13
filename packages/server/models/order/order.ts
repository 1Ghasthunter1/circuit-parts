import mongoose from "mongoose";
import { DatabaseOrder } from "../../types/orderTypes";
import { orderStatuses } from "../../types/universalTypes";
const orderSchema = new mongoose.Schema<DatabaseOrder>({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
    required: true,
  },
  status: {
    type: String,
    enum: [...orderStatuses],
  },
  vendor: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    required: true,
  },
  tracking: {
    carrier: { type: String },
    trackingNumber: { type: String },
  },
  tax: Number,
  shipping: Number,
  purchaser: String,
  reimbursed: Boolean,
  orderDate: Date,
  notes: String,
});

orderSchema.set("toJSON", {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform: (_document: any, returnedObject: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Order = mongoose.model("order", orderSchema);

export default Order;
