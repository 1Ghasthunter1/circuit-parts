import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Assembly } from "../../types/assemblyTypes";
import { AssemblyStatus, assemblyStatuses } from "../../types/universalTypes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editAssemblyById } from "../../services/assemblyServices";
import { Part } from "../../types/partsTypes";
import StatusBox from "../components/StatusBox";

interface StatusProps {
  assembly: Assembly;
  queryKey: string;
}

const AssemblyStatusBox = ({ assembly, queryKey }: StatusProps) => {
  const [onInput, setOnInput] = useState<boolean>(false);
  const [newStatus, setNewStatus] = useState<AssemblyStatus>(assembly.status);

  const queryClient = useQueryClient();

  const editMutation = useMutation(
    async () => {
      await editAssemblyById(assembly.id, {
        ...assembly,
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
                if (rowItem.id === assembly.id)
                  return { ...assembly, status: newStatus };
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
  switch (assembly.status) {
    case "design in progress":
      content = "Design In Progress";
      color = "bg-blue-600";
      break;
    case "ready for assembly":
      content = "Ready for assembly";
      color = "bg-cyan-500";
      break;
    case "assembly in progress":
      content = "Assembly in progress";
      color = "bg-yellow-500";
      break;
    case "design review needed":
      content = "Design review needed";
      color = "bg-red-500";
      break;
    case "done":
      content = "Done";
      color = "bg-green-500";
      break;
    default:
      content = "Unknown";
      color = "bg-red-500";
  }
  const inputStyle =
    "w-36 bg-gray-50 h-8 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-2";
  return (
    <div
      className="whitespace-nowrap w-min cursor-pointer"
      onClick={(e) => e.stopPropagation()}
    >
      {onInput ? (
        <div className="flex items-center">
          <select
            className={inputStyle}
            value={newStatus}
            onChange={(e) => {
              setNewStatus(e.target.value as AssemblyStatus);
            }}
          >
            {assemblyStatuses.map((status) => (
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
          onClick={() => setOnInput(true)}
        >
          <StatusBox status={assembly.status} />
        </div>
      )}
    </div>
  );
};

export default AssemblyStatusBox;
