import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Assembly } from "../../types/assemblyTypes";
import { Part } from "../../types/partsTypes";
import {
  AssemblyStatus,
  assemblyStatuses,
  PartStatus,
  partStatuses,
} from "../../types/universalTypes";

interface StatusProps {
  component: Part | Assembly;
}

const StatusBox = ({ component }: StatusProps) => {
  const [onInput, setOnInput] = useState<boolean>(false);
  const [newStatus, setNewStatus] = useState<AssemblyStatus | PartStatus>(
    "assembly in progress"
  );

  useEffect(() => {
    setNewStatus(component.status);
  }, [component]);

  let content;
  let color;
  switch (component.status) {
    case "design in progress":
      content = "Design In Progress";
      color = "bg-blue-600";
      break;
    case "materials need to be ordered":
      content = "Materials Need Ordering";
      color = "bg-red-600";
      break;
    case "waiting for materials":
      content = "Waiting For Materials";
      color = "bg-yellow-500";
      break;
    case "needs drawing":
      content = "Needs Drawing";
      color = "bg-yellow-500";
      break;
    case "ready for manufacture":
      content = "Ready for manufacture";
      color = "bg-cyan-500";
      break;
    case "ready for cnc":
      content = "Ready for HAAS Mill";
      color = "bg-cyan-500";
      break;
    case "ready for laser":
      content = "Ready for laser";
      color = "bg-cyan-500";
      break;
    case "ready for lathe":
      content = "Ready for lathe";
      color = "bg-cyan-500";
      break;
    case "ready for mill":
      content = "Ready for mill";
      color = "bg-cyan-500";
      break;
    default:
      content = "Unknown";
      color = "bg-red-500";
  }
  const inputStyle =
    "w-36 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5";
  return (
    <div
      className="whitespace-nowrap w-min"
      onClick={(e) => e.stopPropagation()}
    >
      {onInput ? (
        <div className="flex items-center">
          <select
            className={inputStyle}
            value={newStatus}
            onChange={(e) => {
              console.log(e.target.value);
              setNewStatus(e.target.value as AssemblyStatus | PartStatus);
            }}
          >
            {component.type === "part" &&
              partStatuses.map((status) => (
                <option key={status} value={status}>
                  {`${status.charAt(0).toUpperCase()}${status.slice(1)}`}
                </option>
              ))}
            {component.type === "assembly" &&
              assemblyStatuses.map((status) => (
                <option key={status} value={status}>
                  {`${status.charAt(0).toUpperCase()}${status.slice(1)}`}
                </option>
              ))}
          </select>
          <FontAwesomeIcon
            icon={"check-circle"}
            className="ml-3 cursor-pointer"
            size="2x"
            color="green"
            onClick={() => {
              setOnInput(false);
            }}
          />
        </div>
      ) : (
        <div
          className={`px-2 py-1 text-white ${color} rounded-md`}
          onClick={() => setOnInput(true)}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default StatusBox;
