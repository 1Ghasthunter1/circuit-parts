import { useNavigate } from "react-router-dom";
import { Assembly } from "~/types/assemblyTypes";
import { Part } from "~/types/partsTypes";

const TitleCard = ({ component }: { component: Part | Assembly }) => {
  const navigate = useNavigate();
  function exhaustiveCheck(param: never) {}
  const getColor = () => {
    switch (component.priority) {
      case "low":
        return "bg-blue-100 text-blue-600";
      case "normal":
        return "bg-green-100 text-green-500";
      case "high":
        return "bg-orange-100 text-orange-600";
      case "urgent":
        return "bg-red-100 text-red-500";
    }
    exhaustiveCheck(component.priority);
  };

  const navigateUrl = `/${component.type === "part" ? "parts" : "assemblies"}/${
    component.id
  }`;

  return (
    <div
      onClick={() => navigate(navigateUrl)}
      className="whitespace-nowrap w-min cursor-pointer"
    >
      <div
        className={`px-2 py-1 font-bold  ${getColor()} rounded-md  select-none`}
      >
        {component.partNumber}
      </div>
    </div>
  );
};

export default TitleCard;
