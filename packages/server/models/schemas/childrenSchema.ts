import mongoose from "mongoose";
import { Child, isChildType } from "../../types/universalTypes";
const childrenSchema = new mongoose.Schema<Child[]>([
  {
    childType: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) => isChildType(value),
        message: "`children.childType` is not a parent type",
      },
    },
    child: {
      child: mongoose.Types.ObjectId,
      refPath: "child.childType",
      required: true,
      _id: false,
    },
  },
]);

export default childrenSchema;
