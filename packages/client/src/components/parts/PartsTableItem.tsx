import { useNavigate } from "react-router-dom";

import { UnpopulatedPartPopulatedParent } from "../../types/partsTypes";
import { UnpopulatedAssemblyPopulatedParent } from "../../types/assemblyTypes";

import CustomStatusBox from "../components/TypeBox";
import TableParent from "./TableParent";
import StatusBox from "../components/StatusBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface intProps {
  rowItem: UnpopulatedPartPopulatedParent | UnpopulatedAssemblyPopulatedParent;
}

const PartsTableItem = ({ rowItem }: intProps) => {
  const navigate = useNavigate();
  return (
    <tr
      className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700"
      onClick={
        rowItem.type === "part"
          ? () => navigate(`/parts/${rowItem.id}`)
          : () => navigate(`/assemblies/${rowItem.id}`)
      }
    >
      <th
        scope="row"
        className="h-12 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {rowItem.partNumber}
      </th>
      <td className="px-6 mx-auto">
        <CustomStatusBox type={rowItem.type}></CustomStatusBox>
      </td>
      <td className="px-6 whitespace-nowrap">{rowItem.name}</td>
      <td className="px-6 underline whitespace-nowrap">
        <TableParent rowItem={rowItem} />
      </td>
      <td className="px-6 whitespace-nowrap">
        <StatusBox inpStatus={rowItem.status} />
      </td>
      <td className="px-6 whitespace-nowrap grid-cols-2 ">
        <FontAwesomeIcon
          className="mx-2 cursor-pointer"
          icon="trash"
          color="#c70404"
          size="lg"
        />
        <FontAwesomeIcon
          className="mx-2 cursor-pointer"
          icon="square-pen"
          color="#3474eb"
          size="lg"
        />
      </td>
    </tr>
  );
};

export default PartsTableItem;
