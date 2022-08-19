import { Types } from "mongoose";

// Type constants =======================

const childTypes = ["assembly", "part"] as const;

const assemblyStatuses = [
  "design in progress",
  "ready for assembly",
  "assembly in progress",
  "design review needed",
  "done",
] as const;

const partStatuses = [
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

const priorities = ["low", "normal", "high", "urgent"] as const;
const parentTypes = ["assembly", "project"] as const;

//========================================

//Type delcarations
export type PartStatus = typeof partStatuses[number];
export type AssemblyStatus = typeof assemblyStatuses[number];
export type ChildType = typeof childTypes[number];
export type Priority = typeof priorities[number];
export type ParentType = typeof parentTypes[number];

//type guards and validators
export const isPartStatus = (value: string): value is PartStatus => {
  return partStatuses.includes(value as PartStatus);
};
export const isAssemblyStatus = (value: string): value is AssemblyStatus => {
  return assemblyStatuses.includes(value as AssemblyStatus);
};
export const isChildType = (value: string): value is ChildType => {
  return childTypes.includes(value as ChildType);
};
export const isPriorityType = (value: string): value is Priority => {
  return priorities.includes(value as Priority);
};
export const isParentType = (value: string): value is ParentType => {
  return parentTypes.includes(value as ParentType);
};

export interface Child {
  childType: ChildType;
  child: Types.ObjectId;
}
