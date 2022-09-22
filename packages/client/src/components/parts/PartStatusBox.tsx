import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { editPart } from "../../services/partsServices";
import { Assembly } from "../../types/assemblyTypes";
import { Part } from "../../types/partsTypes";
import { PartStatus, partStatuses } from "../../types/universalTypes";
import TopLeftNotif from "../notifications/TopLeftNotification";
import { cssTransition, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        toast.error("Could not update status", {
          autoClose: 2500,
        });
      },
      onSuccess: () => {
        toast.success("Status changed successfully", {
          autoClose: 2500,
        });
      },
    }
  );

  let content;
  let color;
  switch (part.status) {
    case "design in progress":
      content = "Design In Progress";
      color = "bg-blue-600";
      break;
    case "materials need to be ordered":
      content = "Materials Need Ordering";
      color = "bg-red-600";
      break;
    case "waiting for materials":
      content = "Waiting For Materials";
      color = "bg-yellow-500";
      break;
    case "needs drawing":
      content = "Needs Drawing";
      color = "bg-yellow-500";
      break;
    case "ready for manufacture":
      content = "Ready for manufacture";
      color = "bg-cyan-500";
      break;
    case "ready for cnc":
      content = "Ready for HAAS Mill";
      color = "bg-cyan-500";
      break;
    case "ready for laser":
      content = "Ready for laser";
      color = "bg-cyan-500";
      break;
    case "ready for lathe":
      content = "Ready for lathe";
      color = "bg-cyan-500";
      break;
    case "ready for mill":
      content = "Ready for mill";
      color = "bg-cyan-500";
      break;
    default:
      content = "Unknown";
      color = "bg-red-500";
  }
  const inputStyle =
    "w-36 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5";
  return (
    <div
      className="whitespace-nowrap w-min cursor-pointer"
      onClick={(e) => e.stopPropagation()}
    >
      <TopLeftNotif />
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
        <div
          className={`px-2 py-1 text-white ${color} rounded-md select-none`}
          onClick={() => setOnInput(true)}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default PartStatusBox;
