const childType = ["assembly", "part"] as const;
import { Types } from "mongoose";
type ChildType = typeof childType[number];

export interface child {
  childType: ChildType;
  child: Types.ObjectId;
}
