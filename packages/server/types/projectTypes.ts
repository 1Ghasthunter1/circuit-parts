import { Types } from "mongoose";
import { Child } from "./universalTypes";

export interface Project {
  id: Types.ObjectId;
  name: string;
  creationDate: Date;
  prefix: string;
  children: Child[];
  description?: string;
}

export type NewProject = Omit<Project, "id" | "date" | "children">;
