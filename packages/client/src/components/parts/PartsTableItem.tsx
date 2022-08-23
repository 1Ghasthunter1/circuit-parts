import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

import { UnpopulatedPartPopulatedParent } from "../../types/partsTypes";
import { UnpopulatedAssemblyPopulatedParent } from "../../types/assemblyTypes";
import { deletePartById } from "../../services/partsServices";
import { deleteAssemblyById } from "../../services/assemblyServices";

import CustomStatusBox from "../components/TypeBox";
import TableParent from "./TableParent";
import StatusBox from "../components/StatusBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CasualDeleteModal from "../modals/DeleteModalCasual";
import { useState } from "react";

interface intProps {
  rowItem: UnpopulatedPartPopulatedParent | UnpopulatedAssemblyPopulatedParent;
}

const PartsTableItem = ({ rowItem }: intProps) => {
  const [deleteModalVis, setDeleteModalVis] = useState<boolean>(false);
  const navigate = useNavigate();

  const deleteComponent = async (
    component:
      | UnpopulatedPartPopulatedParent
      | UnpopulatedAssemblyPopulatedParent
  ) => {
    switch (component.type) {
      case "assembly":
        await deleteAssemblyById(component.id);
        break;
      case "part":
        await deletePartById(component.id);
        break;
      default:
        throw new Error("component type is not assembly or type");
    }
  };

  return (
    <>
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
      <Modal
        isOpen={deleteModalVis}
        onRequestClose={() => {
          setDeleteModalVis(false);
        }}
        style={{
          overlay: {
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: `rgba(0,0,0,0.2)`,
          },
          content: {
            position: "absolute",
            top: "40%",
            bottom: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(0,0,0,0)",
            borderRadius: 0,
            padding: 0,
            width: "fit-content",
            height: "fit-content",
            border: 0,
          },
        }}
        shouldCloseOnOverlayClick={true}
      >
        <CasualDeleteModal
          component={rowItem}
          closeModal={() => setDeleteModalVis(false)}
          onDelete={() => deleteComponent(rowItem)}
        />
      </Modal>
    </>
  );
};

export default PartsTableItem;
