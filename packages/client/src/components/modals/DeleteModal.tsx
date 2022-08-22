import { useState } from "react";

import { Project } from "../../types/projectTypes";
import { Assembly } from "../../types/assemblyTypes";
import { Part } from "../../types/partsTypes";

import GenericModal from "./GenericModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../elements/Button";

interface CreateModalProps {
  component: Project | Assembly | Part;
  closeModal: () => void;
  onDelete: () => Promise<void>;
}

const DeleteModal = ({ component, closeModal, onDelete }: CreateModalProps) => {
  const [confirmDel, setConfirmDel] = useState<string>("");
  const upperName = component.name.toUpperCase();

  return (
    <GenericModal title={`Delete ${component.name}?`} closeModal={closeModal}>
      <div>
        <div className="mb-4">
          You{"'"}re about to delete {component.type} {component.name}. Type{" "}
          {'"'}
          <b>{upperName}</b>
          {'"'} below to confirm:
        </div>
        <input
          className={`peer bg-gray-50 border-2 ${
            confirmDel === upperName ? "border-rose-400" : "border-blue-400"
          } text-gray-900 text-sm rounded-lg focus:outline-none block w-50 p-2.5 placeholder:text-blue-400`}
          value={confirmDel}
          placeholder={component.name.toUpperCase()}
          onChange={(event) => setConfirmDel(event.target.value)}
        ></input>

        {confirmDel === upperName ? (
          <>
            <div className="mt-2 text-rose-400 text-sm">
              <FontAwesomeIcon className="pr-2" icon="warning" />
              <span>
                This is your last chance to go back; be careful! Deleting this
                project deletes ALL children components
              </span>
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
          </>
        ) : (
          <div className="mt-2 text-blue-400 text-sm">
            Your input and project{"'"}s name in uppercase do not match.
          </div>
        )}
      </div>
    </GenericModal>
  );
};

export default DeleteModal;
