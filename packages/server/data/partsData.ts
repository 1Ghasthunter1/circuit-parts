import { Part } from "../types/partsTypes";

export const parts: Part[] = [
  {
    partNumber: "696-2022-A-1234",
    type: "assembly",
    name: "Random assembly 1",
    id: "d2773337-f723-11e9-8f0b-362b9e155667",
    parent: {
      parentType: "project",
      parentId: "d2773336-f723-11e9-8f0b-362b9e155667",
    },
    status: "design in progress",
    priority: "normal",
  },
  {
    partNumber: "696-2022-P-1201",
    type: "part",
    name: "Serializer bracket",
    id: "d811e46d-70b3-4d90-b090-4535c7cf8fb1",
    parent: {
      parentType: "project",
      parentId: "d2773336-f723-11e9-8f0b-362b9e155667",
    },
    status: "design in progress",
    priority: "normal",
  },
  {
    partNumber: "696-2022-P-1202",
    type: "part",
    name: "Climber hook",
    id: "d2773598-f723-11e9-8f0b-362b9e155667",
    parent: {
      parentType: "project",
      parentId: "d2773336-f723-11e9-8f0b-362b9e155667",
    },
    status: "design in progress",
    priority: "normal",
  },
  {
    partNumber: "696-2022-P-1211",
    type: "part",
    name: "Oogas part!",
    id: "fcd59fa6-c4b4-4fec-ac4d-df4fe1f85f62",
    parent: {
      parentType: "project",
      parentId: "d2773336-f723-11e9-8f0b-362b9e155667",
    },
    status: "design in progress",
    priority: "normal",
  },
];
