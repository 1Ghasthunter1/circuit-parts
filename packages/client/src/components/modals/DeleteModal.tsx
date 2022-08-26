import { Assembly } from "../../types/assemblyTypes";
import { Part } from "../../types/partsTypes";
import { Project } from "../../types/projectTypes";

import GenericModal from "./layouts/GenericModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../elements/Button";
import { UseMutationResult } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import Modal from "react-modal";

interface CreateModalProps {
  component: Project | Assembly | Part;
  serious?: boolean;
  modalVisibility: boolean;
  setModalVisibility: (inp: boolean) => void;
  deleteMutation: UseMutationResult<AxiosResponse, unknown, void, unknown>;
}

Modal.setAppElement("#root");

const DeleteModal = ({
  component,
  serious,
  modalVisibility,
  setModalVisibility,
  deleteMutation,
}: CreateModalProps) => {
  const [confirmDel, setConfirmDel] = useState<string>("");
  const upperName = component.name.toUpperCase();

  const mutationErrorObj = deleteMutation.error as AxiosError | undefined;

  return (
    <Modal
      isOpen={modalVisibility}
      onRequestClose={() => {
        setModalVisibility(false);
      }}
      style={{
        overlay: {
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: `rgba(0,0,0,0.2)`,
        },
        content: {
          position: "absolute",
          top: "40%",
          bottom: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "rgba(0,0,0,0)",
          borderRadius: 0,
          padding: 0,
          width: "fit-content",
          height: "fit-content",
          border: 0,
        },
      }}
      shouldCloseOnOverlayClick={true}
    >
      <GenericModal
        title={`Delete ${component.name}?`}
        closeModal={() => setModalVisibility(false)}
      >
        <div>
          <div className="mb-4">
            {serious ? (
              <div>
                You{"'"}re about to delete {component.type} {component.name}.
                Type {'"'}
                <b>{upperName}</b>
                {'"'} below to confirm:
                <input
                  className={`peer bg-gray-50 border-2 mt-4 ${
                    confirmDel === upperName
                      ? "border-rose-400"
                      : "border-blue-400"
                  } text-gray-900 text-sm rounded-lg focus:outline-none block w-50 p-2.5 placeholder:text-blue-400`}
                  value={confirmDel}
                  placeholder={upperName}
                  onChange={(event) => setConfirmDel(event.target.value)}
                ></input>
              </div>
            ) : (
              `Confirm delelion of ${component.type} ${component.name}?`
            )}
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

          {(!serious || confirmDel === upperName) && (
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
                disabled={deleteMutation.isLoading}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={() => {
                  deleteMutation.mutate();
                }}
              >
                {`Delete ${component.name}`}
              </Button>
            </div>
          )}
        </div>
      </GenericModal>
    </Modal>
  );
};

export default DeleteModal;
