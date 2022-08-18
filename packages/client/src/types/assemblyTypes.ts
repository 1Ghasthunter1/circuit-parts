import { Part } from "./partsTypes";
export const statuses = [
  "design in progress",
  "in production",
  "completed",
] as const;

export const priorities = ["low", "normal", "high", "urgent"] as const;
export const parentType = ["assembly", "project"] as const;

export type Status = typeof statuses[number];
export type PriorityType = typeof priorities[number];
export type ParentType = typeof parentType[number];

export const isStatus = (value: string): value is Status => {
  return statuses.includes(value as Status);
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
  project: string;
  partNumber: string;
  status: Status;
  priority: PriorityType;
  creationDate: Date;
  children: Array<Part | Assembly>;
  notes?: string;
}

export type NewAssembly = Omit<
  Assembly,
  | "id"
  | "partNumber"
  | "status"
  | "priority"
  | "creationDate"
  | "children"
  | "project"
>;