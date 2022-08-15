import { TestPart } from "../../types/partsTypes";
import { v4 as uuidv4 } from "uuid";
import PartTableEntry from "./PartTableEntry";

interface PropType {
  part: TestPart | undefined;
}

const PartTable = ({ part }: PropType) => {
  console.log(part);
  return (
    <div className="overflow-x-auto relative sm:rounded-md my-4">
      <table className="w-1/2 text-sm dark:text-gray-400">
        <tbody>
          <PartTableEntry
            key={uuidv4()}
            title="Part Number"
            value={part?.partNumber}
          />
          <PartTableEntry key={uuidv4()} title="Type" value={part?.type} />
        </tbody>
      </table>
    </div>
  );
};

export default PartTable;
