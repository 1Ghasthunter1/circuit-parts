import { Assembly } from "../../types/assemblyTypes";
import { Part } from "../../types/partsTypes";
import { Project } from "../../types/projectTypes";

import GenericModalLayout from "./layouts/GenericModalLayout";
import BaseModal from "./base/BaseModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../elements/Button";
import { UseMutationResult } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import Modal from "react-modal";
import { Order } from "~/types/orderTypes";

interface ModalProps {
  order: Order;
  serious?: boolean;
  modalVisibility: boolean;
  setModalVisibility: (inp: boolean) => void;
  deleteMutation: UseMutationResult<
    AxiosResponse<Order, any>,
    unknown,
    void,
    unknown
  >;
}

Modal.setAppElement("#root");

const DeleteOrderModal = ({
  order,
  serious,
  modalVisibility,
  setModalVisibility,
  deleteMutation,
}: ModalProps) => {
  const [confirmDel, setConfirmDel] = useState<string>("");
  const upperName = order.orderNumber.toUpperCase();

  const mutationErrorObj = deleteMutation.error as AxiosError | undefined;

  return (
    <BaseModal
      modalVisibility={modalVisibility}
      setModalVisibility={setModalVisibility}
    >
      <GenericModalLayout
        title={`Delete order ${order.orderNumber}?`}
        closeModal={() => setModalVisibility(false)}
      >
        <div>
          <div className="mb-4">
            {serious ? (
              <div className="select-none">
                You{"'"}re about to delete order {order.orderNumber} from{" "}
                {order.vendor}. Type {'"'}
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
              <span>
                Confirm deletion of order <b>{order.orderNumber}</b> from{" "}
                <b>{order.vendor}</b>?
              </span>
            )}
          </div>

          {mutationErrorObj && (
            <div className="mt-2 text-rose-400 text-sm">
              <span>Error deleting order</span>
            </div>
          )}

          {(!serious || confirmDel === upperName) && (
            <div className="flex justify-between">
              <div className="mt-2 text-rose-400 text-sm">
                <FontAwesomeIcon className="pr-2" icon="warning" />
                <span>This action is irreversible!</span>
              </div>
              <Button
                style="primary"
                color="red"
                size="md"
                iconName="trash"
                isLoading={deleteMutation.isLoading}
                onClick={() => {
                  if (!deleteMutation.isLoading) deleteMutation.mutate();
                }}
              >
                <>Delete order {order.orderNumber}</>
              </Button>
            </div>
          )}
        </div>
      </GenericModalLayout>
    </BaseModal>
  );
};

export default DeleteOrderModal;
