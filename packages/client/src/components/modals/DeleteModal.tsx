import GenericModal from "./GenericModal";
import { Project } from "../../types/projectTypes";
import { Assembly } from "../../types/assemblyTypes";
import { Part } from "../../types/partsTypes";

interface CreateModalProps {
  component: Project | Assembly | Part;
  closeModal: () => void;
}

const DeleteModal = ({ component, closeModal }: CreateModalProps) => {
  return (
    <GenericModal title={`Delete ${component.name}?`} closeModal={closeModal}>
      <div>stuff here!</div>
    </GenericModal>
  );
};

export default DeleteModal;
