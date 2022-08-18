const childType = ["assembly", "part"] as const;
type ChildType = typeof childType[number];

export interface Child {
  childType: ChildType;
  child: string;
}
