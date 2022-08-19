import { Types } from "mongoose";
import { DatabaseAssembly } from "./assemblyTypes";
import { DatabaseProject } from "./projectTypes";
import { ParentType, PartStatus, Priority } from "./universalTypes";
export interface DatabasePart {
  id: Types.ObjectId;
  name: string;
  partNumber: string;
  parent: {
    parentType: ParentType;
    parent: Types.ObjectId;
  };
  status: PartStatus;
  priority: Priority;
  project: Types.ObjectId;
  notes?: string;
  sourceMaterial?: string;
  haveMaterial?: boolean;
  materialCutLength?: string;
  quantityRequired?: number;
  creationDate: Date;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ToDatabasePart extends Omit<DatabasePart, "id"> {}
export interface PartToUser extends Omit<DatabasePart, "parent"> {
  parent: DatabaseAssembly | DatabaseProject;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NewPart
  extends Omit<DatabasePart, "id" | "partNumber" | "status" | "priority"> {}
