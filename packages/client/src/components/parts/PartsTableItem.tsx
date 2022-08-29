import { useNavigate } from "react-router-dom";

import { Part } from "../../types/partsTypes";
import { Assembly } from "../../types/assemblyTypes";

import CustomStatusBox from "../components/TypeBox";
import TableParent from "./TableParent";
import StatusBox from "../components/StatusBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CasualDeleteModal from "../modals/DeleteModal";
import EditPartModal from "../parts/EditPartModal";
import { useState } from "react";
import { useMutation, UseQueryResult } from "react-query";
import { deletePartById } from "../../services/partsServices";
import { deleteAssemblyById } from "../../services/assemblyServices";

interface intProps {
  rowItem: Part | Assembly;
  queryToRefresh: UseQueryResult<(Part | Assembly)[], unknown>;
}

const PartsTableItem = ({ rowItem, queryToRefresh }: intProps) => {
  const [deleteModalVis, setDeleteModalVis] = useState<boolean>(false);
  const [editPartModalVis, setEditPartModalVis] = useState<boolean>(false);

  const navigate = useNavigate();

  const deleteComponentMutation = useMutation(
    async () =>
      rowItem.type === "part"
        ? await deletePartById(rowItem.id)
        : await deleteAssemblyById(rowItem.id),
    { onSuccess: async () => await queryToRefresh.refetch() }
  );

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
        <td className="mx-6">
          <div
            className="grid grid-cols-2 justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              onClick={() => {
                setDeleteModalVis(true);
              }}
            >
              <FontAwesomeIcon
                className="mx-2 cursor-pointer"
                icon="trash"
                color="#c70404"
                size="lg"
              />
            </div>

            <div
              onClick={() => {
                setEditPartModalVis(true);
              }}
            >
              <FontAwesomeIcon
                className="mx-2 cursor-pointer"
                icon="square-pen"
                color="#3474eb"
                size="lg"
              />
            </div>
          </div>
        </td>
      </tr>
      <CasualDeleteModal
        component={rowItem}
        modalVisibility={deleteModalVis}
        setModalVisibility={setDeleteModalVis}
        deleteMutation={deleteComponentMutation}
      />
      {rowItem.type === "part" && (
        <EditPartModal
          modalVisibility={editPartModalVis}
          setModalVisibility={setEditPartModalVis}
          part={rowItem}
          queryToRefresh={queryToRefresh}
        />
      )}
    </>
  );
};

export default PartsTableItem;
