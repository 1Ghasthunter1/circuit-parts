const childType = ["assembly", "part"] as const;
import { Types } from "mongoose";
type ChildType = typeof childType[number];

export interface Child {
  childType: ChildType;
  child: Types.ObjectId;
}
