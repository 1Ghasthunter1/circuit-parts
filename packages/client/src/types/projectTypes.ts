export interface Project {
  name: string;
  prefix: string;
  id: string;
  description?: string;
  creationDate: Date;
}

export type SubmitProject = Omit<Project, "id" | "creationDate">;
