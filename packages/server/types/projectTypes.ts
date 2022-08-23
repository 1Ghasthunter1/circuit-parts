/* eslint-disable @typescript-eslint/no-empty-interface */
import { Types } from "mongoose";
import { Child } from "./universalTypes";
import { DatabaseAssembly } from "./assemblyTypes";
import { DatabasePart } from "./partsTypes";

export interface DatabaseProject {
  id: Types.ObjectId;
  name: string;
  creationDate: Date;
  prefix: string;
  type: "project";
  children: Child[];
  description?: string;
}

export interface NewProject
  extends Omit<DatabaseProject, "id" | "date" | "children" | "type"> {}

export interface ProjectToDB extends Omit<DatabaseProject, "id"> {}

export interface PopulatedProject extends Omit<DatabaseProject, "children"> {
  children: Array<DatabaseAssembly | DatabasePart>
}
