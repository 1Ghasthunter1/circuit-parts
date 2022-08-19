import {
  DatabasePart,
  DatabaseAssembly,
  DatabaseComponent,
  isPartStatus,
  isAssemblyStatus,
} from "../types/componentTypes";

export const componentToDbPart = (
  component: DatabaseComponent | null
): DatabasePart | null => {
  if (!component) return null;
  if (component.type !== "part") return null;
  if (!isPartStatus(component.status)) return null;

  const dbPart: DatabasePart = {
    ...component,
    status: component.status,
    type: component.type,
  };
  return dbPart;
};

export const componentToDbAssembly = (
  component: DatabaseComponent | null
): DatabaseAssembly | null => {
  if (!component) return null;
  if (component.type !== "assembly") return null;
  if (!isAssemblyStatus(component.status)) return null;
  if (!component.children) return null;
  const dbAssembly: DatabaseAssembly = {
    ...component,
    status: component.status,
    type: component.type,
    children: component.children,
  };
  return dbAssembly;
};
