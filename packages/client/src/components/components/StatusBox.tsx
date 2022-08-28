import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { PartStatus } from "../../types/universalTypes";
import { AssemblyStatus } from "../../types/universalTypes";

interface StatusProps {
  inpStatus: PartStatus | AssemblyStatus;
}

const StatusBox = ({ inpStatus }: StatusProps) => {
  const [onInput, setOnInput] = useState<boolean>(false);
  const getJSX = () => {
    switch (inpStatus) {
      case "design in progress":
        return <div>Design In Progress</div>;
      default:
        return <div>No status</div>;
    }
  };
  const inputStyle =
    "w-36 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";
  return (
    <div
      className="whitespace-nowrap w-min"
      onClick={(e) => e.stopPropagation()}
    >
      {onInput ? (
        <div className="flex items-center">
          <select className={inputStyle}>
            <option value="text">Waiting for CAD</option>
            <option value="text">Waiting for CNC</option>
            <option value="text">Done</option>
          </select>
          <FontAwesomeIcon
            icon={"check-circle"}
            className="ml-3 cursor-pointer"
            size="2x"
            color="green"
            onClick={() => setOnInput(false)}
          />
        </div>
      ) : (
        <div
          className="px-2 py-1 bg-blue-600 text-white rounded-md"
          onClick={() => setOnInput(true)}
        >
          {getJSX()}
        </div>
      )}
    </div>
  );
};

export default StatusBox;
