import { string } from "yup";
import { Part } from "~/types/partsTypes";
import { Assembly } from "../../types/assemblyTypes";

const StatusBox = ({
  status,
}: {
  status: Assembly["status"] | Part["status"];
}) => {
  function exhaustiveCheck(param: never) {}
  const getStuff = () => {
    switch (status) {
      case "design in progress":
        return { text: "Design In progress", color: "bg-blue-600" };
      case "ready for assembly":
        return { text: "Ready for assembly", color: "bg-cyan-500" };
      case "assembly in progress":
        return { text: "Assembly in progress", color: "bg-yellow-500" };
      case "design review needed":
        return { text: "Design review needed", color: "bg-red-500" };
      case "materials need to be ordered":
        return { text: "Materials need ordering", color: "bg-red-600" };
      case "waiting for materials":
        return { text: "Waiting for materials", color: "bg-yellow-500" };
      case "ready for manufacture":
        return { text: "Ready for manufacture", color: "bg-cyan-500" };
      case "ready for cnc":
        return { text: "Ready for CNC", color: "bg-cyan-500" };
      case "ready for laser":
        return { text: "Ready for laser", color: "bg-cyan-500" };
      case "ready for lathe":
        return { text: "Ready for laser", color: "bg-cyan-500" };
      case "ready for mill":
        return { text: "Ready for laser", color: "bg-cyan-500" };
      case "needs drawing":
        return { text: "Needs drawing", color: "bg-cyan-500" };
      case "done":
        return { text: "Done", color: "bg-green-500" };
    }
    exhaustiveCheck(status);
  };
  const { text, color } = getStuff();
  return (
    <div className="whitespace-nowrap w-min cursor-pointer">
      <div className={`px-2 py-1 text-white ${color} rounded-md  select-none`}>
        {text}
      </div>
    </div>
  );
};

export default StatusBox;
