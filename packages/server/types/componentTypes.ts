import { Types } from "mongoose";
import { Assembly } from "./assemblyTypes";
import { Project } from "./projectTypes";

// DEFINE TYPES HERE ==============
export const partStatuses = [
  "design in progress",
  "materials need to be ordered",
  "waiting for materials",
  "needs drawing",
  "ready for manufacture",
  "ready for cnc",
  "ready for laser",
  "ready for lathe",
  "ready for mill",
] as const;

const childTypes = ["assembly", "part"] as const;

export const assemblyStatuses = [
  "design in progress",
  "ready for assembly",
  "assembly in progress",
  "needs revision",
  "done",
] as const;

export const priorities = ["low", "normal", "high", "urgent"] as const;

export const componentTypes = ["assembly", "part"] as const;

export const parentTypes = ["assembly", "project"] as const;
// ================================

export type PartStatus = typeof partStatuses[number];
export type AssemblyStatus = typeof assemblyStatuses[number];
export type PriorityType = typeof priorities[number];
export type ComponentType = typeof componentTypes[number];
export type ParentType = typeof parentTypes[number];
export type ChildType = typeof childType[number];

export const isPartStatus = (value: string): value is PartStatus => {
  return partStatuses.includes(value as PartStatus);
};
export const isAssemblyStatus = (value: string): value is AssemblyStatus => {
  return assemblyStatuses.includes(value as AssemblyStatus);
};
export const isPriorityType = (value: string): value is PriorityType => {
  return priorities.includes(value as PriorityType);
};
export const isParentType = (value: string): value is ParentType => {
  return parentTypes.includes(value as ParentType);
};
export const isComponentType = (value: string): value is ComponentType => {
  return componentTypes.includes(value as ComponentType);
};

export interface DatabaseComponent {
  id: Types.ObjectId;
  name: string;
  type: ComponentType;
  parent: {
    parentType: ParentType;
    parent: Types.ObjectId;
  };
  project: Types.ObjectId;
  partNumber: string;
  status: PartStatus | AssemblyStatus;
  priority: PriorityType;
  creationDate: Date;
  children?: {
    childType: ChildType;
    child: Types.ObjectId;
  };
  notes?: string;
  sourceMaterial?: string;
  haveMaterial?: boolean;
  materialCutLength?: string;
  quantityRequired?: number;
}

export interface DatabasePart
  extends Omit<DatabaseComponent, "status" | "children"> {
  status: PartStatus;
}

export type NewPart = Omit<
  DatabasePart,
  "id" | "partNumber" | "status" | "priority" | "creationDate" | "type"
>;

export interface DatabaseAssembly
  extends Omit<DatabaseComponent, "status" | "children"> {
  status: AssemblyStatus;
  children: {
    childType: ChildType;
    child: Types.ObjectId;
  };
}

export type NewAssembly = Omit<
  DatabaseAssembly,
  | "id"
  | "partNumber"
  | "status"
  | "priority"
  | "creationDate"
  | "type"
  | "children"
>;
