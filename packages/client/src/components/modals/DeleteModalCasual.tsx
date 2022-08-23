import { UnpopulatedProject } from "../../types/projectTypes";
import { UnpopulatedAssemblyPopulatedParent } from "../../types/assemblyTypes";
import { UnpopulatedPartPopulatedParent } from "../../types/partsTypes";

import GenericModal from "./GenericModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../elements/Button";

interface CreateModalProps {
  component:
    | UnpopulatedProject
    | UnpopulatedAssemblyPopulatedParent
    | UnpopulatedPartPopulatedParent;
  closeModal: () => void;
  onDelete: () => Promise<void>;
}

const DeleteModal = ({ component, closeModal, onDelete }: CreateModalProps) => {
  return (
    <GenericModal title={`Delete ${component.name}?`} closeModal={closeModal}>
      <div>
        <div className="mb-4">
          Confirm delelion of {component.type} {component.name}?
        </div>

        <div className="mt-2 text-rose-400 text-sm">
          <FontAwesomeIcon className="pr-2" icon="warning" />
          <span>This action is irreversible!</span>
        </div>
        <Button
          bgColor="bg-rose-500"
          txtColor="text-white"
          style="float-right mt-4 disabled"
          hoverColor="hover:bg-rose-400"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={() => onDelete()}
        >
          Delete forever
        </Button>
      </div>
    </GenericModal>
  );
};

export default DeleteModal;
