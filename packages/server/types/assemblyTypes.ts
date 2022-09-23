import { Types } from "mongoose";
import { DatabaseProject } from "./projectTypes";
import {
  Parent,
  assemblyStatuses,
  AssemblyStatus,
  Priority,
  Child,
  PopulatedPathItem,
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
  path: Parent[];
  project: Types.ObjectId;
  status: AssemblyStatus;
  priority: Priority;
  creationDate: Date;
  notes?: string;
}

export type ToDatabaseAssembly = Omit<DatabaseAssembly, "id">;

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
  extends Omit<DatabaseAssembly, "parent" | "children" | "project" | "path"> {
  parent: DatabaseAssembly | DatabaseProject;
  children: (DatabasePart | DatabaseAssembly)[];
  project: DatabaseProject;
  path: PopulatedPathItem[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NewAssembly
  extends Omit<
    DatabaseAssembly,
    "id" | "partNumber" | "status" | "priority" | "type" | "path"
  > {}
