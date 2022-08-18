import { Types } from "mongoose";

export const statuses = [
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

export interface Part {
  id: Types.ObjectId;
  name: string;
  parent: {
    parentType: ParentType;
    parentId: Types.ObjectId;
  };
  type: "part";
  project: Types.ObjectId;
  partNumber: string;
  status: Status;
  priority: PriorityType;
  notes?: string;
  sourceMaterial?: string;
  haveMaterial?: boolean;
  materialCutLength?: string;
  quantityRequired?: number;
  creationDate: Date;
}

export type NewPart = Omit<
  Part,
  "id" | "partNumber" | "status" | "priority" | "project"
>;
