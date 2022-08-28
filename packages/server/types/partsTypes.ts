/* eslint-disable @typescript-eslint/no-empty-interface */
import { Types } from "mongoose";
import { DatabaseAssembly } from "./assemblyTypes";
import { DatabaseProject } from "./projectTypes";
import { Parent, partStatuses, PartStatus, Priority } from "./universalTypes";

export const isPartStatus = (value: string): value is PartStatus => {
  return partStatuses.includes(value as PartStatus);
};
export interface DatabasePart {
  id: Types.ObjectId;
  name: string;
  partNumber: string;
  type: "part";
  parent: Parent;
  project: Types.ObjectId;
  status: PartStatus;
  priority: Priority;
  creationDate: Date;
  notes?: string;
  sourceMaterial?: string;
  haveMaterial?: boolean;
  materialCutLength?: string;
  quantityRequired?: number;
}

export interface ToDatabasePart extends Omit<DatabasePart, "id"> {}
export interface Part extends Omit<DatabasePart, "parent"> {
  parent: DatabaseAssembly | DatabaseProject;
}

export type EditedPart = Omit<DatabasePart, "id" | "partNumber" | "type" | "parent" | "project" | "creationDate">;
export interface NewPart
  extends Omit<
    DatabasePart,
    "id" | "partNumber" | "status" | "priority" | "type"
  > {}
