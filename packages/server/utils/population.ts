import AssemblyModel from "../models/assembly";
import PartModel from "../models/part";

import { DatabaseAssembly, Assembly } from "../types/assemblyTypes";
import { DatabaseProject } from "../types/projectTypes";
import { DatabasePart, Part } from "../types/partsTypes";
import { Parent, ParentType } from "../types/universalTypes";

import { Types } from "mongoose";
import ProjectModel from "../models/project";

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

  const populatedPath = await populatePath(foundAssembly.path);

  const modifiedAssembly: Assembly = {
    ...foundAssembly.toJSON(),
    children: foundAssembly.children.map((childObj) => childObj.child),
    parent: foundAssembly.parent.parent,
    path: populatedPath,
  };
  return modifiedAssembly;
};

export const getMultiplePopulatedAssys = async (query: unknown) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const foundAssembly = await AssemblyModel.find(query)
    .populate<{
      parent: {
        parentType: ParentType;
        parent: DatabaseProject | DatabaseAssembly;
      };
    }>("parent.parent")
    .populate<{ project: { projectType: string; project: DatabaseProject } }>(
      "project"
    );

  return foundAssembly;
};

export const getMultipleAssysForUser = async (
  query: unknown
): Promise<Assembly[]> => {
  const foundAssemblies = await getMultiplePopulatedAssys(query);

  if (!foundAssemblies) return [];

  const modifiedAssemblies: Assembly[] = foundAssemblies.map((assy) => ({
    ...assy.toJSON(),
    parent: assy.parent.parent,
  }));

  return modifiedAssemblies;
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

  const populatedPath = await populatePath(foundPart.path);

  const modifiedPart: Part = {
    ...foundPart.toJSON(),
    parent: foundPart.parent.parent,
    path: populatedPath,
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
    parent: part.parent.parent,
  }));

  return modifiedParts;
};

export const populatePath = async (path: Parent[]) => {
  //Firstly, separate path objects by type
  const projectIds = path.reduce<Types.ObjectId[]>((projIds, pathItem) => {
    if (pathItem.parentType === "project")
      return projIds.concat(pathItem.parent);
    return projIds;
  }, []);

  const assemblyIds = path.reduce<Types.ObjectId[]>((assyIds, pathItem) => {
    if (pathItem.parentType === "assembly")
      return assyIds.concat(pathItem.parent);
    return assyIds;
  }, []);

  //query each individually
  const updatedProjects = await ProjectModel.find({
    _id: { $in: projectIds },
  }).select({ name: 1, _id: 1, type: 1 });

  const updatedAssemblies = await AssemblyModel.find({
    _id: { $in: assemblyIds },
  }).select({ name: 1, _id: 1, type: 1 });

  //re-match with original order from path. THis is sort of redundant but its safe
  const populatedPath = path.reduce<
    { id: Types.ObjectId; name: string; type: ParentType }[]
  >((popPath, pathItem) => {
    switch (pathItem.parentType) {
      case "assembly":
        const foundAssembly = updatedAssemblies.find(
          (updatedAssy) =>
            updatedAssy._id.toString() === pathItem.parent.toString()
        );
        if (!foundAssembly)
          throw new Error("fatal error in populatePath in utils");
        return popPath.concat({
          id: foundAssembly._id,
          name: foundAssembly.name,
          type: foundAssembly.type,
        });
      case "project":
        const foundProject = updatedProjects.find((updatedProj) => {
          return updatedProj._id.toString() === pathItem.parent.toString();
        });
        if (!foundProject)
          throw new Error("fatal error in populatePath in utils");
        return popPath.concat({
          id: foundProject._id,
          name: foundProject.name,
          type: foundProject.type,
        });
    }
  }, []);

  return populatedPath;
};
