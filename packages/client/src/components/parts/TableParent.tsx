import { useNavigate } from "react-router-dom";
import { UnpopulatedAssemblyPopulatedParent } from "../../types/assemblyTypes";
import { UnpopulatedPartPopulatedParent } from "../../types/partsTypes";

interface props {
  rowItem: UnpopulatedAssemblyPopulatedParent | UnpopulatedPartPopulatedParent;
}
const TableParent = ({ rowItem }: props) => {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        const parent = rowItem.parent;
        switch (rowItem.parent.type) {
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
      {rowItem.parent.name}
    </div>
  );
};

export default TableParent;
