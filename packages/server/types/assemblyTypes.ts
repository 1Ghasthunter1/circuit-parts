import { Types } from "mongoose";
import { DatabaseProject } from "./projectTypes";
import {
  Parent,
  assemblyStatuses,
  AssemblyStatus,
  Priority,
  Child,
} from "./universalTypes";

export const isAssemblyStatus = (value: string): value is AssemblyStatus => {
  return assemblyStatuses.includes(value as AssemblyStatus);
};

export interface DatabaseAssembly {
  id: Types.ObjectId;
  name: string;
  partNumber: string;
  parent: Parent;
  children: Child[];
  status: AssemblyStatus;
  priority: Priority;
  project: Types.ObjectId;
  notes?: string;
  creationDate: Date;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ToDatabaseAssembly extends Omit<DatabaseAssembly, "id"> {}
export interface AssemblyToUser extends Omit<DatabaseAssembly, "parent"> {
  parent: DatabaseAssembly | DatabaseProject;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NewAssembly
  extends Omit<DatabaseAssembly, "id" | "partNumber" | "status" | "priority"> {}
