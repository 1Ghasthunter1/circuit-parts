import { Assembly } from "../../types/assemblyTypes";
import { Part } from "../../types/partsTypes";

import GenericModal from "./GenericModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../elements/Button";
import { useMutation } from "react-query";
import { deletePartById } from "../../services/partsServices";
import { deleteAssemblyById } from "../../services/assemblyServices";
import { AxiosError } from "axios";

interface CreateModalProps {
  component: Assembly | Part;
  closeModal: () => void;
  afterDelete?: (() => void) | (() => Promise<void>);
}

const DeleteModal = ({
  component,
  closeModal,
  afterDelete,
}: CreateModalProps) => {
  const mutation = useMutation(
    async () =>
      component.type === "part"
        ? await deletePartById(component.id)
        : await deleteAssemblyById(component.id),
    { onSuccess: afterDelete }
  );

  const mutationErrorObj = mutation.error as AxiosError | undefined;

  return (
    <GenericModal title={`Delete ${component.name}?`} closeModal={closeModal}>
      <div>
        <div className="mb-4">
          Confirm delelion of {component.type} {component.name}?
        </div>

        {mutationErrorObj && (
          <div className="mt-2 text-rose-400 text-sm">
            <span>
              {mutationErrorObj.response?.status === 409
                ? "Assembly still has children"
                : `Error ${mutationErrorObj.response?.status || ""}`}
            </span>
          </div>
        )}
        <div className="flex items-center">
          <div className="mt-2 text-rose-400 text-sm">
            <FontAwesomeIcon className="pr-2" icon="warning" />
            <span>This action is irreversible!</span>
          </div>
          <Button
            bgColor="bg-rose-500"
            txtColor="text-white"
            style="ml-auto mt-4 disabled"
            hoverColor="hover:bg-rose-400"
            disabled={mutation.isLoading}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={() => {
              mutation.mutate();
            }}
          >
            {`Delete ${component.name}`}
          </Button>
        </div>
      </div>
    </GenericModal>
  );
};

export default DeleteModal;
