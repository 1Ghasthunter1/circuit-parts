/* eslint-disable @typescript-eslint/no-empty-interface */
import { Child } from "./universalTypes";
import { Part } from "./partsTypes";
import { Assembly } from "./assemblyTypes";
export interface UnpopulatedProject {
  id: string;
  name: string;
  creationDate: Date;
  prefix: string;
  type: "project";
  children: Child[];
  description?: string;
}

export interface Project extends Omit<UnpopulatedProject, "children"> {
  children: Array<Part | Assembly>;
}
export type NewProject = Omit<
  UnpopulatedProject,
  "id" | "date" | "children" | "type" | "creationDate"
>;
