import GenericModalLayout from "../modals/layouts/GenericModalLayout";
import BaseModal from "../modals/base/BaseModal";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { UseQueryResult } from "react-query";
import * as Yup from "yup";
import Button from "../../elements/Button";
import { OrderItem } from "~/types/orderTypes";
import ECombobox from "~/elements/ECombobox";
import { knownCarriers } from "~/constants";
import { OrderItemPNSchema } from "~/utils/orders/orderItemSchema";

interface CreateModalProps {
  modalVisibility: boolean;
  setModalVisibility: (inp: boolean) => void;
  orderItem: OrderItem;
  onSubmit: ({
    partNumber,
    vendorUrl,
  }: {
    partNumber: string;
    vendorUrl: string;
  }) => void;
}

Modal.setAppElement("#root");

const OrderItemPartNumberModal = ({
  modalVisibility,
  setModalVisibility,
  onSubmit,
  orderItem,
}: CreateModalProps) => {
  return (
    <BaseModal
      modalVisibility={modalVisibility}
      setModalVisibility={setModalVisibility}
    >
      <GenericModalLayout
        title="Edit Part Number"
        closeModal={() => setModalVisibility(false)}
      >
        <Formik
          initialValues={{
            partNumber: orderItem.partNumber,
            vendorUrl: orderItem.vendorUrl || "",
          }}
          validationSchema={OrderItemPNSchema}
          onSubmit={(values) => onSubmit(values)}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <div className="mb-4 ">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Part Number*
                </label>
                <Field
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  name="partNumber"
                  placeholder="Enter a part number"
                />
                <ErrorMessage
                  name="partNumber"
                  component="div"
                  className="text-xs text-red-400"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Vendor URL
                </label>
                <Field
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  name="vendorUrl"
                  placeholder="Enter a vendor URL here"
                />
                <ErrorMessage
                  name="vendorUrl"
                  component="div"
                  className="text-xs text-red-400"
                />
              </div>

              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <Button
                  type="submit"
                  style="primary"
                  color="blue"
                  iconName="check"
                  isLoading={isSubmitting}
                  disabled={!isValid}
                >
                  Update Part Number
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </GenericModalLayout>
    </BaseModal>
  );
};

export default OrderItemPartNumberModal;
