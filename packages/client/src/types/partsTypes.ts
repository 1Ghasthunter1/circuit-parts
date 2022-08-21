import { Project } from "./projectTypes";
import { Assembly } from "./assemblyTypes";

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

export const entryType = ["part", "assembly"] as const;
export const priorities = ["low", "normal", "high", "urgent"] as const;
export const parentType = ["assembly", "project"] as const;

export type PartStatus = typeof partStatuses[number];
export type EntryType = typeof entryType[number];
export type PriorityType = typeof priorities[number];
export type ParentType = typeof parentType[number];

export const isStatus = (value: string): value is PartStatus => {
  return partStatuses.includes(value as PartStatus);
};
export const isPartAssembly = (value: string): value is EntryType => {
  return entryType.includes(value as EntryType);
};
export const isPriorityType = (value: string): value is PriorityType => {
  return priorities.includes(value as PriorityType);
};
export const isParentType = (value: string): value is ParentType => {
  return parentType.includes(value as ParentType);
};

export interface BasePart {
  id: string;
  name: string;
  partNumber: string;
  type: "part";
  status: PartStatus;
  priority: PriorityType;
  notes?: string;
  sourceMaterial?: string;
  haveMaterial?: boolean;
  materialCutLength?: string;
  quantityRequired?: number;
}

export interface Part extends BasePart {
  parent: {
    parentType: ParentType;
    parent: Assembly | Project;
  };
  project: Project;
}
export interface NewPart
  extends Omit<
    BasePart,
    "id" | "partNumber" | "status" | "priority" | "project" | "type"
  > {
  project: string;
  parent: {
    parentType: ParentType;
    parent: string;
  };
}
