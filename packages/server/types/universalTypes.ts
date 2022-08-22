import { Types } from "mongoose";
// Type constants =======================

export const childTypes = ["assembly", "part"] as const;

export const assemblyStatuses = [
  "design in progress",
  "ready for assembly",
  "assembly in progress",
  "design review needed",
  "done",
] as const;

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

export const priorities = ["low", "normal", "high", "urgent"] as const;
export const parentTypes = ["assembly", "project"] as const;
export const componentTypes = ["assembly", "project", "part"];

//========================================

//Type delcarations
export type PartStatus = typeof partStatuses[number];
export type AssemblyStatus = typeof assemblyStatuses[number];
export type ChildType = typeof childTypes[number];
export type Priority = typeof priorities[number];
export type ParentType = typeof parentTypes[number];
export type ComponentType = typeof componentTypes[number];

//type guards and validators
export const isChildType = (value: string): value is ChildType => {
  return childTypes.includes(value as ChildType);
};
export const isPriority = (value: string): value is Priority => {
  return priorities.includes(value as Priority);
};
export const isParentType = (value: string): value is ParentType => {
  return parentTypes.includes(value as ParentType);
};
export const isComponentType = (value: unknown): value is ComponentType => {
  return componentTypes.includes(value as ComponentType);
};

export interface Child {
  childType: ChildType;
  child: Types.ObjectId;
}

export interface Parent {
  parentType: ParentType;
  parent: Types.ObjectId;
}
