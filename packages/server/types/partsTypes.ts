export type PartTypes = "part" | "assembly";

export type Priority = "low" | "normal" | "high" | "top";

export type Status =
  | "design in progress"
  | "materials need to be ordered"
  | "waiting for materials"
  | "needs drawing"
  | "ready for manufacture"
  | "ready for cnc"
  | "ready for laser"
  | "ready for lathe"
  | "ready for mill";

export interface Part {
  id: string;
  name: string;
  projectId: string;
  partNumber: string;
  type: PartTypes;
  status: Status;
  notes?: string;
  sourceMaterial?: string;
  haveMaterial?: boolean;
  materialCutLength?: string;
  quantityRequired?: number;
  priority: Priority;
}

export type NewPart = Omit<Part, "id" | "partNumber" | "status">;
