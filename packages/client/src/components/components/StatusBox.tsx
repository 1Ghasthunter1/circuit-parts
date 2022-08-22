import { PartStatus } from "../../types/universalTypes";
import { AssemblyStatus } from "../../types/universalTypes";

interface StatusProps {
  inpStatus: PartStatus | AssemblyStatus;
}

const StatusBox = ({ inpStatus }: StatusProps) => {
  const getJSX = () => {
    switch (inpStatus) {
      case "design in progress":
        return <div>Design In Progress</div>;
      default:
        return <div>No status</div>; 
    }
  };
  return (
    <div className="whitespace-nowrap w-min px-2 py-1 bg-blue-600 text-white rounded-md">
      {getJSX()}
    </div>
  );
};

export default StatusBox;
