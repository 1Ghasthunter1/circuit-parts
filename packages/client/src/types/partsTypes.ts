type PartTypes = "part" | "assembly";

export interface TestPart {
  partNumber: string;
  type: PartTypes;
  name: string;
  id: string;
}
