import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { editPart } from "../../services/partsServices";
import { Assembly } from "../../types/assemblyTypes";
import { Part } from "../../types/partsTypes";
import { PartStatus, partStatuses } from "../../types/universalTypes";
import toast from "react-hot-toast";
import StatusBox from "../components/StatusBox";

interface StatusProps {
  part: Part;
  queryKey?: string;
}

const PartStatusBox = ({ part, queryKey }: StatusProps) => {
  const [onInput, setOnInput] = useState<boolean>(false);
  const [newStatus, setNewStatus] = useState<PartStatus>(part.status);

  const queryClient = useQueryClient();

  const editMutation = useMutation(
    async () => {
      await editPart(part.id, {
        ...part,
        notes: part.notes || "",
        sourceMaterial: part.sourceMaterial || "",
        haveMaterial: part.haveMaterial || false,
        materialCutLength: part.materialCutLength || "",
        quantityRequired: part.quantityRequired || 0,
        status: newStatus,
      });
    },
    {
      onMutate: () =>
        queryClient.setQueryData<(Part | Assembly)[]>(
          [queryKey],
          (previous) => {
            if (previous)
              return previous.map((rowItem) => {
                if (rowItem.id === part.id)
                  return { ...part, status: newStatus };
                return rowItem;
              });
            return [];
          }
        ),
      onError: () => {
        toast.error("Could not update status");
      },
      onSuccess: () => {
        toast.success("Status changed successfully");
      },
    }
  );
  const inputStyle =
    "w-36 bg-gray-50 h-8 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-2";
  return (
    <div
      className="whitespace-nowrap w-min cursor-pointer"
      onClick={(e) => e.stopPropagation()}
    >
      {onInput && queryKey ? (
        <div className="flex items-center">
          <select
            className={inputStyle}
            value={newStatus}
            onChange={(e) => {
              setNewStatus(e.target.value as PartStatus);
            }}
          >
            {partStatuses.map((status) => (
              <option key={status} value={status}>
                {`${status.charAt(0).toUpperCase()}${status.slice(1)}`}
              </option>
            ))}
          </select>
          <FontAwesomeIcon
            icon={"check-circle"}
            className="ml-3 cursor-pointer"
            size="2x"
            color="green"
            onClick={() => {
              editMutation.mutate();
              setOnInput(false);
            }}
          />
        </div>
      ) : (
        <div onClick={() => setOnInput(true)}>
          <StatusBox status={part.status} />
        </div>
      )}
    </div>
  );
};

export default PartStatusBox;
