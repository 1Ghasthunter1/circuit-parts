import { useNavigate } from "react-router-dom";
import { Assembly } from "../../types/assemblyTypes";
import { Part } from "../../types/partsTypes";

interface props {
  rowItem: Part | Assembly;
}
const TableParent = ({ rowItem }: props) => {
  const navigate = useNavigate();
  const parent = rowItem.parent;
  console.log(parent);
  return (
    <div
      className="cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        switch (parent.type) {
          case "assembly":
            navigate(`/assemblies/${parent.id}`);
            break;
          case "project":
            navigate(`/projects/${parent.id}`);
            break;
          default:
            null;
        }
      }}
    >
      {parent.name}
    </div>
  );
};

export default TableParent;
