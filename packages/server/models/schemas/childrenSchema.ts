import { SchemaDefinitionProperty, Types, Schema } from "mongoose";
import { Child, isChildType } from "../../types/universalTypes";
interface dbChild extends Omit<Child, "child"> {
  child: SchemaDefinitionProperty<Types.ObjectId> | undefined;
}
const childrenSchema = new Schema<dbChild>({
  childType: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => isChildType(value),
      message: "`childType` is not a parent type",
    },
  },
  child: {
    type: Types.ObjectId,
    refPath: "children.childType",
    required: true,
  },
});

export default childrenSchema;
