import { Types } from "mongoose";
import { Child } from "./universalTypes";

export interface DatabaseProject {
  id: Types.ObjectId;
  name: string;
  creationDate: Date;
  prefix: string;
  type: "project";
  children: Child[];
  description?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NewProject
  extends Omit<DatabaseProject, "id" | "date" | "children" | "type"> {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProjectToDB extends Omit<DatabaseProject, "id"> {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProjectToUser extends DatabaseProject {}
