import { DatabaseAssembly } from "../../types/assemblyTypes";
import { DatabaseProject } from "../../types/projectTypes";
import { ComponentType } from "../../types/universalTypes";
import PartModel from "../../models/part";
import AssemblyModel from "../../models/assembly";
import ProjectModel from "../../models/project";

interface parsedPN {
  projectPrefix: string;
  sequentialAssyNumber: number;
  sequentialPartNumber: number;
  componentType: "A" | "P";
}

const parsePN = (partNumberToParse: string): parsedPN => {
  const secondToLastDelimiter = partNumberToParse.lastIndexOf(
    "-",
    partNumberToParse.lastIndexOf("-") - 1
  ); //takes last two items from string, AKA -P-1234
  const projectPrefix = partNumberToParse.slice(0, secondToLastDelimiter);
  const identifier = partNumberToParse.slice(
    secondToLastDelimiter,
    partNumberToParse.length
  );

  const [, componentType, fourDigitPN] = identifier.split("-");
  const sequentialAssyNumber = parseInt(fourDigitPN.substring(0, 2));
  const sequentialPartNumber = parseInt(fourDigitPN.substring(2, 4));

  if (componentType === "A" && sequentialPartNumber > 0)
    throw new Error(
      "assembly component cannot have sequential part number greater than 0"
    );
  if (componentType !== "A" && componentType !== "P")
    throw new Error("component type is not A or P");

  return {
    projectPrefix,
    sequentialAssyNumber,
    sequentialPartNumber,
    componentType,
  };
};

const twoDigitNumToStr = (input: number) => {
  if (input > 99)
    throw new Error("two digit number to string must be less than 100");
  return input.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
};

export const generateNewPartNumber = async (
  project: DatabaseProject,
  parent: DatabaseAssembly | DatabaseProject,
  type: ComponentType
) => {
  let typeLetter, seqAN, seqPN;

  console.log(parent);

  if (type === "assembly") {
    typeLetter = "A";

    const assembliesInProject = await AssemblyModel.find({
      project: project.id,
    });

    const addSeqAssemblyIds = assembliesInProject.reduce(
      (ANs: number[], currentAssembly) => {
        const seqANReducer = parsePN(
          currentAssembly.partNumber
        ).sequentialAssyNumber;
        return [...ANs, seqANReducer];
      },
      []
    );
    if (addSeqAssemblyIds.length > 0)
      seqAN = twoDigitNumToStr(Math.max(...addSeqAssemblyIds) + 1);
    else seqAN = "00";
  } else if (type === "part" && parent.type === "assembly") {
    //parent must be an assembly and we know we are making a part, so we will search for all parts with given parent ID
    typeLetter = "P";
    seqAN = twoDigitNumToStr(parsePN(parent.partNumber).sequentialAssyNumber);

    const partsInAssembly = await PartModel.find({
      "parent.parent": parent.id,
    });

    const allSeqPartIds = partsInAssembly.reduce(
      (PNs: number[], currentPart) => {
        const seqPNRecucer = parsePN(
          currentPart.partNumber
        ).sequentialPartNumber;
        return [...PNs, seqPNRecucer];
      },
      []
    );

    if (allSeqPartIds.length > 0)
      seqPN = twoDigitNumToStr(Math.max(...allSeqPartIds) + 1);
    else seqPN = "01";

    console.log(seqPN);
  } else
    throw new Error(
      `cannot make "${type}" part number if it is a child of ${parent.type}.`
    );

  return `${project.prefix}-${typeLetter}-${seqAN || "00"}${seqPN || "00"}`;
};

export const doThing = async () => {
  const project = await ProjectModel.findById("630110d2555f074bdee362c1");
  const assembly = await AssemblyModel.findById("630110e0555f074bdee362d3");
  if (!project || !assembly) return;
  // const parent: DatabaseProject = project.toJSON();
  const parent: DatabaseAssembly = assembly.toJSON();
  const result = await generateNewPartNumber(project, parent, "part");
  return result;
};

doThing();
