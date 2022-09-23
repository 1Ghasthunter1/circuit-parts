import { SchemaDefinitionProperty, Types, Schema } from "mongoose";
import { Parent, isParentType } from "../../types/universalTypes";
interface dbParent extends Omit<Parent, "parent"> {
  parent: SchemaDefinitionProperty<Types.ObjectId> | undefined;
}
const parentSchema = new Schema<dbParent>(
  {
    parentType: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) => isParentType(value),
        message: "`parent.parentType` is not a parent type",
      },
    },
    parent: {
      type: Types.ObjectId,
      refPath: "parent.parentType",
      required: true,
    },
  },
  { _id: false }
);

export default parentSchema;
