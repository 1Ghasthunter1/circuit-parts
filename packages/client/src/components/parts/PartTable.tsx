import { Part } from "../../types/partsTypes";
import { v4 as uuidv4 } from "uuid";
import PartTableEntry from "./PartTableEntry";

interface PropType {
  part: Part;
}

const PartTable = ({ part }: PropType) => {
  return (
    <div className="overflow-x-auto relative sm:rounded-md my-4">
      <table className="w-1/2 text-sm dark:text-gray-400">
        <tbody>
          <PartTableEntry
            key={part.id}
            title="Part Number"
            value={part?.partNumber}
          />
          <PartTableEntry key={uuidv4()} title="Type" value={part?.type} />
          <PartTableEntry
            key={uuidv4()}
            title="Description"
            value={part?.notes}
          />
        </tbody>
      </table>
    </div>
  );
};

export default PartTable;
