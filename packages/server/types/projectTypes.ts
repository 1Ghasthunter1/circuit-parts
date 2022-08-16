import { Types } from "mongoose";

export interface Project {
  id: Types.ObjectId;
  name: string;
  prefix: string;
}

export type NewProject = Omit<Project, "id">;
