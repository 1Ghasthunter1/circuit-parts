import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { deletePartById } from "~/services/partsServices";
import { Part } from "~/types/partsTypes";
import DeleteModal from "../modals/DeleteModal";
import EditPartModal from "./EditPartModal";

const PartActions = ({
  part,
  queryToRefresh,
}: {
  part: Part;
  queryToRefresh: string;
}) => {
  const [deleteModalVis, setDeleteModalVis] = useState<boolean>(false);
  const [editModalVis, setEditModalVis] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const deletePartMutation = useMutation(
    async () => await deletePartById(part.id),
    {
      onSuccess: async () => {
        setDeleteModalVis(false);
        toast.success(`Deleted ${part.name}`);
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
        component={part}
        modalVisibility={deleteModalVis}
        setModalVisibility={setDeleteModalVis}
        deleteMutation={deletePartMutation}
      />
      <EditPartModal
        modalVisibility={editModalVis}
        setModalVisibility={setEditModalVis}
        part={part}
        queryKey={queryToRefresh}
      />
    </div>
  );
};

export default PartActions;
