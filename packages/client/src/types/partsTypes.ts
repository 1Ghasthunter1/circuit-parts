// eslint-disable-file @typescript-eslint/no-empty-interface
import { UnpopulatedAssembly } from "./assemblyTypes";
import { UnpopulatedProject } from "./projectTypes";
import {
  Parent,
  partStatuses,
  PartStatus,
  Priority,
  PopulatedPathItem,
} from "./universalTypes";

export const isPartStatus = (value: string): value is PartStatus => {
  return partStatuses.includes(value as PartStatus);
};
export interface UnpopulatedPart {
  id: string;
  name: string;
  partNumber: string;
  type: "part";
  parent: Parent;
  project: string;
  path: Parent[];
  status: PartStatus;
  priority: Priority;
  creationDate: Date;
  notes?: string;
  sourceMaterial?: string;
  haveMaterial?: boolean;
  materialCutLength?: string;
  quantityRequired?: number;
}

export interface Part
  extends Omit<UnpopulatedPart, "parent" | "project" | "path"> {
  parent: UnpopulatedAssembly | UnpopulatedProject;
  project: UnpopulatedProject;
  path: PopulatedPathItem[];
}

export interface EditedPart
  extends Omit<
    UnpopulatedPart,
    | "id"
    | "partNumber"
    | "type"
    | "parent"
    | "project"
    | "creationDate"
    | "notes"
    | "sourceMaterial"
    | "haveMaterial"
    | "materialCutLength"
    | "quantityRequired"
    | "path"
  > {
  notes: string;
  sourceMaterial: string;
  haveMaterial: boolean;
  materialCutLength: string;
  quantityRequired: number;
}

export type NewPart = Omit<
  UnpopulatedPart,
  "id" | "partNumber" | "status" | "priority" | "type" | "creationDate" | "path"
>;
