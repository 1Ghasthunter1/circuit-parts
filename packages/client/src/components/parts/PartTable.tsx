import { Part } from "../../types/partsTypes";
import { v4 as uuidv4 } from "uuid";
import PartTableEntry from "./PartTableEntry";
import TypeBox from "../components/TypeBox";
import PartStatusBox from "./PartStatusBox";
import PriorityBox from "../components/PriorityBox";
import CustomBox from "../components/CustomBox";

interface PropType {
  part: Part;
}

const PartTable = ({ part }: PropType) => {
  return (
    <div className="overflow-x-auto relative sm:rounded-md my-4">
      <table className="w-1/2 text-sm dark:text-gray-400">
        <tbody>
          <PartTableEntry title="Name" content={part.name} />
          <PartTableEntry title="Part Number" content={part?.partNumber} />
          <PartTableEntry title="Type" content={<TypeBox type="part" />} />
          <PartTableEntry title="Parent" content={part.parent.name} />
          <PartTableEntry title="Project" content={part.project.name} />
          <PartTableEntry
            title="Status"
            content={<PartStatusBox part={part} />}
          />
          <PartTableEntry
            title="Priority"
            content={<PriorityBox priority={part.priority} />}
          />
          <PartTableEntry
            title="Creation Date"
            content={new Date(part.creationDate).toLocaleString("en-US")}
          />
          <PartTableEntry
            title="Have Material"
            content={
              <CustomBox
                text={part.haveMaterial ? "Yes" : "No"}
                className={
                  part.haveMaterial
                    ? "bg-green-100 text-green-500"
                    : "bg-red-300 text-red-500"
                }
              />
            }
          />
          <PartTableEntry
            title="Quantity Required"
            content={part.quantityRequired?.toString()}
          />
          <PartTableEntry
            title="Material Cut Length"
            content={part.materialCutLength}
          />
          <PartTableEntry
            title="Source Material"
            content={part.sourceMaterial}
          />
          <PartTableEntry
            title="Notes"
            content={part.notes}
          />
        </tbody>
      </table>
    </div>
  );
};

export default PartTable;
