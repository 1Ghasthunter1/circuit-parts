import { UnpopulatedProject } from "./projectTypes";
import { UnpopulatedPart } from "./partsTypes";

import {
  Parent,
  assemblyStatuses,
  AssemblyStatus,
  Priority,
  Child,
  PopulatedPathItem,
} from "./universalTypes";

export const isAssemblyStatus = (value: string): value is AssemblyStatus => {
  return assemblyStatuses.includes(value as AssemblyStatus);
};

export interface UnpopulatedAssembly {
  id: string;
  name: string;
  partNumber: string;
  type: "assembly";
  parent: Parent;
  children: Child[];
  path: Parent[];
  project: string;
  status: AssemblyStatus;
  priority: Priority;
  creationDate: Date;
  notes?: string;
}

// eslint-disable-file @typescript-eslint/no-empty-interface

export interface Assembly
  extends Omit<
    UnpopulatedAssembly,
    "parent" | "children" | "project" | "path"
  > {
  parent: UnpopulatedProject | UnpopulatedAssembly;
  children: Array<UnpopulatedPart | UnpopulatedAssembly>;
  project: UnpopulatedProject;
  path: PopulatedPathItem[];
}

export type EditedAssembly = Omit<
  UnpopulatedAssembly,
  | "id"
  | "partNumber"
  | "type"
  | "parent"
  | "children"
  | "project"
  | "creationDate"
  | "path"
>;

export type NewAssembly = Omit<
  UnpopulatedAssembly,
  | "id"
  | "partNumber"
  | "status"
  | "priority"
  | "type"
  | "children"
  | "creationDate"
  | "path"
>;
