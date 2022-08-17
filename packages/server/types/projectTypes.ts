import { Types } from "mongoose";

export interface Project {
  id: Types.ObjectId;
  name: string;
  creationDate: Date;
  prefix: string;
  description?: string;
}

export type NewProject = Omit<Project, "id" | "date">;
