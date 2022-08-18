const childType = ["assembly", "part"] as const;

export const statuses = [
  "design in progress",
  "materials need to be ordered",
  "waiting for materials",
  "needs drawing",
  "ready for manufacture",
  "ready for cnc",
  "ready for laser",
  "ready for lathe",
  "ready for mill",
] as const;

export type Status = typeof statuses[number];

type ChildType = typeof childType[number];

export interface Child {
  childType: ChildType;
  child: string;
}
