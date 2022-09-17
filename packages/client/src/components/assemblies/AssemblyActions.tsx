import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { deleteAssemblyById } from "~/services/assemblyServices";
import { Assembly } from "~/types/assemblyTypes";
import DeleteModal from "../modals/DeleteModal";
import EditAssemblyModal from "./EditAssemblyModal";

const AssemblyActions = ({
  assembly,
  queryToRefresh,
}: {
  assembly: Assembly;
  queryToRefresh: string;
}) => {
  const [deleteModalVis, setDeleteModalVis] = useState<boolean>(false);
  const [editModalVis, setEditModalVis] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const deleteComponentMutation = useMutation(
    async () => await deleteAssemblyById(assembly.id),
    {
      onSuccess: async () => {
        setDeleteModalVis(false);
        toast.success(`Deleted ${assembly.name}`);
        await queryClient.invalidateQueries([queryToRefresh]);
      },
    }
  );

  return (
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
          setEditModalVis(true);
        }}
      >
        <FontAwesomeIcon
          className="mx-2 cursor-pointer"
          icon="square-pen"
          color="#3474eb"
          size="lg"
        />
      </div>
      <DeleteModal
        component={assembly}
        modalVisibility={deleteModalVis}
        setModalVisibility={setDeleteModalVis}
        deleteMutation={deleteComponentMutation}
      />
      <EditAssemblyModal
        modalVisibility={editModalVis}
        setModalVisibility={setEditModalVis}
        assembly={assembly}
        queryKey={queryToRefresh}
      />
    </div>
  );
};

export default AssemblyActions;
