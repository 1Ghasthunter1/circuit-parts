import { Types } from "mongoose";
import { child } from "./universalTypes";

export interface Project {
  id: Types.ObjectId;
  name: string;
  creationDate: Date;
  prefix: string;
  children: child[];
  description?: string;
}

export type NewProject = Omit<Project, "id" | "date">;
