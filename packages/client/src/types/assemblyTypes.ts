import { Part } from "./partsTypes";
import { Project } from "./projectTypes";

export const assemblyStatuses = [
  "design in progress",
  "in production",
  "completed",
] as const;

export const priorities = ["low", "normal", "high", "urgent"] as const;
export const parentType = ["assembly", "project"] as const;

export type AssemblyStatus = typeof assemblyStatuses[number];
export type PriorityType = typeof priorities[number];
export type ParentType = typeof parentType[number];

export const isStatus = (value: string): value is AssemblyStatus => {
  return assemblyStatuses.includes(value as AssemblyStatus);
};
export const isPriorityType = (value: string): value is PriorityType => {
  return priorities.includes(value as PriorityType);
};
export const isParentType = (value: string): value is ParentType => {
  return parentType.includes(value as ParentType);
};

export interface Assembly {
  id: string;
  name: string;
  parent: {
    parentType: ParentType;
    parentId: string;
  };
  type: "assembly";
  project: Project;
  partNumber: string;
  status: AssemblyStatus;
  priority: PriorityType;
  creationDate: Date;
  children: Array<Part | Assembly>;
  notes?: string;
}

export interface NewAssembly
  extends Omit<
    Assembly,
    | "id"
    | "partNumber"
    | "status"
    | "priority"
    | "creationDate"
    | "children"
    | "project"
    | "type"
  > {
  project: string;
}
