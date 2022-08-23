// eslint-disable-file @typescript-eslint/no-empty-interface
import { UnpopulatedAssembly } from "./assemblyTypes";
import { UnpopulatedProject } from "./projectTypes";
import { Parent, partStatuses, PartStatus, Priority } from "./universalTypes";

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
  status: PartStatus;
  priority: Priority;
  creationDate: Date;
  notes?: string;
  sourceMaterial?: string;
  haveMaterial?: boolean;
  materialCutLength?: string;
  quantityRequired?: number;
}

export interface Part extends Omit<UnpopulatedPart, "parent"> {
  parent: UnpopulatedAssembly | UnpopulatedProject;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NewPart
  extends Omit<
    UnpopulatedPart,
    "id" | "partNumber" | "status" | "priority" | "type" | "creationDate"
  > {}
