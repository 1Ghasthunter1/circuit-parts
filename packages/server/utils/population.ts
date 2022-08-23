import AssemblyModel from "../models/assembly";
import PartModel from "../models/part";

import { DatabaseAssembly, Assembly } from "../types/assemblyTypes";
import { DatabaseProject } from "../types/projectTypes";
import { DatabasePart, Part } from "../types/partsTypes";
import { ParentType } from "../types/universalTypes";

//FOR ASSEMBLIES ======================================
export const getPopulatedAssy = async (assyId: string) => {
  //This behemoth simply gets an assembly and populates parent.parent, children.child and project with Types!
  const foundAssembly = await AssemblyModel.findById(assyId)
    .populate<{
      parent: {
        parentType: ParentType;
        parent: DatabaseProject | DatabaseAssembly;
      };
    }>("parent.parent")
    .populate<{
      children: Array<{
        childType: string;
        child: DatabaseAssembly | DatabasePart;
      }>;
    }>("children.child")
    .populate<{ project: { projectType: string; project: DatabaseProject } }>(
      "project"
    );

  return foundAssembly;
};

export const getAssyForUser = async (
  assyId: string
): Promise<Assembly | null> => {
  const foundAssembly = await getPopulatedAssy(assyId);

  if (!foundAssembly) return null;

  const modifiedAssembly: Assembly = {
    ...foundAssembly.toJSON(),
    children: foundAssembly.children.map((childObj) => childObj.child),
    parent: foundAssembly.parent.parent,
  };
  return modifiedAssembly;
};

export const getMultiplePopulatedAssys = async (query: unknown) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const foundPart = await PartModel.find(query)
    .populate<{
      parent: {
        parentType: ParentType;
        parent: DatabaseProject | DatabaseAssembly;
      };
    }>("parent.parent")
    .populate<{ project: { projectType: string; project: DatabaseProject } }>(
      "project"
    );

  return foundPart;
};

export const getMultipleAssysForUser = async (
  query: unknown
): Promise<Part[]> => {
  const foundParts = await getMultiplePopulatedParts(query);

  if (!foundParts) return [];

  const modifiedParts: Part[] = foundParts.map((part) => ({
    ...part.toJSON(),
    part: part.parent.parent,
  }));

  return modifiedParts;
};

//FOR PARTS ======================================
export const getPopulatedPart = async (partId: string) => {
  const foundPart = await PartModel.findById(partId)
    .populate<{
      parent: {
        parentType: ParentType;
        parent: DatabaseProject | DatabaseAssembly;
      };
    }>("parent.parent")
    .populate<{ project: { projectType: string; project: DatabaseProject } }>(
      "project"
    );

  return foundPart;
};

export const getMultiplePopulatedParts = async (query: unknown) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const foundPart = await PartModel.find(query)
    .populate<{
      parent: {
        parentType: ParentType;
        parent: DatabaseProject | DatabaseAssembly;
      };
    }>("parent.parent")
    .populate<{ project: { projectType: string; project: DatabaseProject } }>(
      "project"
    );

  return foundPart;
};

export const getPartForUser = async (partId: string): Promise<Part | null> => {
  const foundPart = await getPopulatedPart(partId);

  if (!foundPart) return null;

  const modifiedPart: Part = {
    ...foundPart.toJSON(),
    parent: foundPart.parent.parent,
  };
  return modifiedPart;
};

export const getMultiplePartsForUser = async (
  query: unknown
): Promise<Part[]> => {
  const foundParts = await getMultiplePopulatedParts(query);

  if (!foundParts) return [];

  const modifiedParts: Part[] = foundParts.map((part) => ({
    ...part.toJSON(),
    part: part.parent.parent,
  }));

  return modifiedParts;
};
