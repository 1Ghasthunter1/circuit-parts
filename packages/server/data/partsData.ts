import { Part } from "../types/partsTypes";
import mongoose from "mongoose";

const toObjectId = (str: string): mongoose.Types.ObjectId => {
  return new mongoose.Types.ObjectId(str);
};
export const parts: Part[] = [
  {
    partNumber: "696-2022-A-1234",
    type: "assembly",
    name: "Random assembly 1",
    id: toObjectId("62fbcebac9d48af279ac5eea"),
    parent: {
      parentType: "project",
      parentId: toObjectId("62fbcebac9d48af279ac5eea"),
    },
    status: "design in progress",
    priority: "normal",
  },
  {
    partNumber: "696-2022-P-1201",
    type: "part",
    name: "Serializer bracket",
    id: toObjectId("62fbcebac9d48af279ac5eea"),
    parent: {
      parentType: "project",
      parentId: toObjectId("62fbcebac9d48af279ac5eea"),
    },
    status: "design in progress",
    priority: "normal",
  },
  {
    partNumber: "696-2022-P-1202",
    type: "part",
    name: "Climber hook",
    id: toObjectId("62fbcebac9d48af279ac5eea"),
    parent: {
      parentType: "project",
      parentId: toObjectId("62fbcebac9d48af279ac5eea"),
    },
    status: "design in progress",
    priority: "normal",
  },
  {
    partNumber: "696-2022-P-1211",
    type: "part",
    name: "Oogas part!",
    id: toObjectId("62fbcebac9d48af279ac5eea"),
    parent: {
      parentType: "project",
      parentId: toObjectId("62fbcebac9d48af279ac5eea"),
    },
    status: "design in progress",
    priority: "normal",
  },
];
