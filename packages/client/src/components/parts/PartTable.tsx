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
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg w-1/2">
      <table className="divide-y divide-gray-300 w-full">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
            >
              Property
            </th>
            <th
              scope="col"
              className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
            >
              Value
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
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
                    : "bg-red-100 text-red-500"
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
          <PartTableEntry title="Notes" content={part.notes} />
        </tbody>
      </table>
    </div>
  );
};

export default PartTable;
