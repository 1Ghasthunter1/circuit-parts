declare module "valtio" {
  function useSnapshot<T extends object>(p: T): T;
}

// Type constants =======================
export const userRoles = ["admin", "user", "owner"] as const;

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
export const orderStatuses = ["open", "ordered", "received"] as const;

//========================================

//Type delcarations
export type UserRole = typeof userRoles[number];
export type PartStatus = typeof partStatuses[number];
export type AssemblyStatus = typeof assemblyStatuses[number];
export type ChildType = typeof childTypes[number];
export type Priority = typeof priorities[number];
export type ParentType = typeof parentTypes[number];
export type ComponentType = typeof componentTypes[number];
export type OrderStatus = typeof orderStatuses[number];

//type guards and validators
export const isUserRole = (value: string): value is UserRole => {
  return userRoles.includes(value as UserRole);
};
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
export const isOrderStatus = (value: unknown): value is OrderStatus => {
  return orderStatuses.includes(value as OrderStatus);
};

export interface Child {
  childType: ChildType;
  child: string;
}

export interface Parent {
  parentType: ParentType;
  parent: string;
}

export interface FooterState {
  links: { text: string; url: string; onClick?: () => void }[];
}

export interface DashboardState {
  selectedProjectId: string;
}
export interface PopulatedPathItem {
  id: string;
  name: string;
  type: ParentType;
}
