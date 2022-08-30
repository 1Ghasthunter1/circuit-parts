import { Types } from "mongoose";
import { DatabaseProject } from "./projectTypes";
import {
  Parent,
  assemblyStatuses,
  AssemblyStatus,
  Priority,
  Child,
} from "./universalTypes";
import { DatabasePart } from "./partsTypes";

export const isAssemblyStatus = (value: string): value is AssemblyStatus => {
  return assemblyStatuses.includes(value as AssemblyStatus);
};

export interface DatabaseAssembly {
  id: Types.ObjectId;
  name: string;
  partNumber: string;
  type: "assembly";
  parent: Parent;
  children: Child[];
  project: Types.ObjectId;
  status: AssemblyStatus;
  priority: Priority;
  creationDate: Date;
  notes?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ToDatabaseAssembly extends Omit<DatabaseAssembly, "id"> {}

export type EditedAssembly = Omit<
  DatabaseAssembly,
  | "id"
  | "partNumber"
  | "type"
  | "parent"
  | "children"
  | "project"
  | "creationDate"
>;
export interface Assembly
  extends Omit<DatabaseAssembly, "parent" | "children" | "project"> {
  parent: DatabaseAssembly | DatabaseProject;
  children: Array<DatabasePart | DatabaseAssembly>;
  project: DatabaseProject;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NewAssembly
  extends Omit<
    DatabaseAssembly,
    "id" | "partNumber" | "status" | "priority" | "type"
  > {}
