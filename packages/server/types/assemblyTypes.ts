import { Types } from "mongoose";
import { DatabaseProject } from "./projectTypes";
import { ParentType, AssemblyStatus, Priority, Child } from "./universalTypes";
export interface DatabaseAssembly {
  id: Types.ObjectId;
  name: string;
  partNumber: string;
  parent: {
    parentType: ParentType;
    parent: Types.ObjectId;
  };
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
