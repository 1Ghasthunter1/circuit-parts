import { Types } from "mongoose";

//Define constants ================

export const childTypes = ["assembly", "part"] as const;

//=================================

export type ChildType = typeof childTypes[number];

export interface ChildObject {
  childType: ChildType;
  child: Types.ObjectId;
}
