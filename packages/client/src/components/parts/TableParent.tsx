import { useNavigate } from "react-router-dom";
import { UnpopulatedAssemblyPopulatedParent } from "../../types/assemblyTypes";
import { UnpopulatedPartPopulatedParent } from "../../types/partsTypes";

interface props {
  rowItem: UnpopulatedAssemblyPopulatedParent | UnpopulatedPartPopulatedParent;
}
const TableParent = ({ rowItem }: props) => {
  const navigate = useNavigate();
  console.log(rowItem);

  const parent = rowItem.parent.parent;

  return (
    <div
      className="cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        const parent = rowItem.parent;
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
