import { UnpopulatedProject } from "./projectTypes";
import { UnpopulatedPartPopulatedParent } from "./partsTypes";

import {
  Parent,
  assemblyStatuses,
  AssemblyStatus,
  Priority,
  Child,
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
  project: string;
  status: AssemblyStatus;
  priority: Priority;
  creationDate: Date;
  notes?: string;
}

// eslint-disable-file @typescript-eslint/no-empty-interface

export interface Assembly
  extends Omit<UnpopulatedAssembly, "parent" | "children" | "project"> {
  parent: UnpopulatedProject | UnpopulatedAssembly;
  children: Array<
    UnpopulatedPartPopulatedParent | UnpopulatedAssemblyPopulatedParent
  >;
  project: UnpopulatedProject;
}

export interface UnpopulatedAssemblyPopulatedParent
  extends Omit<UnpopulatedAssembly, "parent"> {
  parent: UnpopulatedProject | UnpopulatedAssembly;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NewAssembly
  extends Omit<
    UnpopulatedAssembly,
    | "id"
    | "partNumber"
    | "status"
    | "priority"
    | "type"
    | "children"
    | "creationDate"
  > {}
