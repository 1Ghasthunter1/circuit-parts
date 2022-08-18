import { Part } from "./partsTypes";

export interface Project {
  id: string;
  name: string;
  creationDate: Date;
  prefix: string;
  children: Part[];
  description?: string;
}

export type SubmitProject = Omit<Project, "id" | "creationDate" | "children">;
