import { Types } from "mongoose";
import { DatabaseProject } from "./projectTypes";
import {
  Parent,
  assemblyStatuses,
  AssemblyStatus,
  Priority,
  Child,
  ComponentType,
} from "./universalTypes";
import { DatabasePart } from "./partsTypes";

export const isAssemblyStatus = (value: string): value is AssemblyStatus => {
  return assemblyStatuses.includes(value as AssemblyStatus);
};

export interface DatabaseAssembly {
  id: Types.ObjectId;
  name: string;
  partNumber: string;
  parent: Parent;
  children: Child[];
  project: Types.ObjectId;
  status: AssemblyStatus;
  priority: Priority;
  creationDate: Date;
  type: ComponentType
  notes?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ToDatabaseAssembly extends Omit<DatabaseAssembly, "id" | "type"> {}

export interface PopulatedAssembly
  extends Omit<DatabaseAssembly, "parent" | "children"> {
  parent: DatabaseAssembly | DatabaseProject;
  children: Array<DatabasePart | DatabaseAssembly>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NewAssembly
  extends Omit<DatabaseAssembly, "id" | "partNumber" | "status" | "priority" | "type"> {}
