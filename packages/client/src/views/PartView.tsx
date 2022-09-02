import { useParams } from "react-router";
import { deletePartById, fetchPart } from "../services/partsServices";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Part } from "../types/partsTypes";
import PartTable from "../components/parts/PartTable";
import TopLeftRightAndMiddle from "../layouts/TopLeftRightAndMiddle";
import Button from "../elements/Button";
import CasualDeleteModal from "../components/modals/DeleteModal";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
const PartView = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [deleteModalVis, setDeleteModalVis] = useState<boolean>(false);
  const [editPartModalVis, setEditPartModalVis] = useState<boolean>(false);
  const { id } = useParams();
  if (!id) return null;

  const partQuery = useQuery<Part>(`/parts/${id}`, () => fetchPart(id));
  const part = partQuery.data;

  const deleteComponentMutation = useMutation(
    async () => {
      return deletePartById(part?.id || "");
    },
    {
      onSuccess: async () => {
        navigate(`/projects/${part?.project.id}`);
        toast.success("Deleted Part");
      },
      onError: async () => toast.error("Error deleting part"),
      onSettled: async () => {
        await queryClient.invalidateQueries([
          `/projects/${part?.project.id}/components`,
        ]);
      },
    }
  );

  if (!part) return null;

  const pageTitle = (
    <>
      <div className="text-4xl font-bold ">Part: {part.name}</div>
      <div className="text-gray-500">
        Part Number: <b>{part.partNumber}</b>
      </div>
    </>
  );

  const topRightStuff = (
    <div className="mr-4 space-x-4">
      <Button
        iconName="pencil"
        className="bg-blue-500 hover:bg-blue-600 text-white"
      >
        Edit
      </Button>
      <Button
        iconName="trash"
        className="bg-red-500 hover:bg-red-600 text-white"
        onClick={() => setDeleteModalVis(true)}
      >
        Delete
      </Button>
    </div>
  );

  return (
    <div className="m-8">
      <TopLeftRightAndMiddle
        topLeftContent={pageTitle}
        topRightContent={topRightStuff}
      >
        <PartTable part={part} />
      </TopLeftRightAndMiddle>
      <CasualDeleteModal
        component={part}
        modalVisibility={deleteModalVis}
        setModalVisibility={setDeleteModalVis}
        deleteMutation={deleteComponentMutation}
      />
    </div>
  );
};

export default PartView;
