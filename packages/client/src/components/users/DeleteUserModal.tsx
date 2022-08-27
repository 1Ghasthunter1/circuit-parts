import GenericModalLayout from "../modals/layouts/GenericModalLayout";
import BaseModal from "../modals/base/BaseModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../elements/Button";
import { UseMutationResult } from "react-query";
import { AxiosResponse } from "axios";
import { useState } from "react";
import Modal from "react-modal";
import { User } from "../../types/userTypes";

interface CreateModalProps {
  user: User;
  serious?: boolean;
  modalVisibility: boolean;
  setModalVisibility: (inp: boolean) => void;
  deleteMutation: UseMutationResult<AxiosResponse, unknown, void, unknown>;
}

Modal.setAppElement("#root");

const DeleteUserModal = ({
  user,
  serious,
  modalVisibility,
  setModalVisibility,
  deleteMutation,
}: CreateModalProps) => {
  const [confirmDel, setConfirmDel] = useState<string>("");
  const upperName = `${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}`;

  return (
    <BaseModal
      modalVisibility={modalVisibility}
      setModalVisibility={setModalVisibility}
    >
      <GenericModalLayout
        title={`Delete ${user.firstName} ${user.lastName}'s Account?`}
        closeModal={() => setModalVisibility(false)}
      >
        <div>
          <div className="mb-4">
            {serious ? (
              <div className="select-none">
                You{"'"}re about to delete {user.firstName} {user.lastName}
                {"'"}s account. Type {'"'}
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
              `Confirm delelion of ${user.firstName} ${user.lastName}'s account?`
            )}
          </div>

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
                  setModalVisibility(false);
                  setConfirmDel("");
                }}
              >
                {`Delete User`}
              </Button>
            </div>
          )}
        </div>
      </GenericModalLayout>
    </BaseModal>
  );
};

export default DeleteUserModal;
