import GenericModalLayout from "../modals/layouts/GenericModalLayout";
import BaseModal from "../modals/base/BaseModal";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation, UseQueryResult } from "react-query";
import * as Yup from "yup";
import Button from "../../elements/Button";
import toast from "react-hot-toast";
import { IOrderToServer, Order } from "~/types/orderTypes";
import { createOrder } from "~/services/ordersService";
import ECombobox from "~/elements/ECombobox";
import { knownCarriers } from "~/constants";

interface CreateModalProps {
  modalVisibility: boolean;
  setModalVisibility: (inp: boolean) => void;
  order: Order;
  onSubmit: ({
    carrier,
    trackingNumber,
  }: {
    carrier: string;
    trackingNumber: string;
  }) => void;
  queriesToInvalidate?: UseQueryResult[];
}

const NewOrderSchema = Yup.object().shape({
  carrier: Yup.string()
    .min(3, "Must be at least 3 characters long")
    .max(255, "Too Long!")
    .required("Required"),
  trackingNumber: Yup.string()
    .min(3, "Must be at least 3 characters long")
    .max(255, "Too Long!")
    .required("Required"),
});

Modal.setAppElement("#root");

const TrackingModal = ({
  modalVisibility,
  setModalVisibility,
  queriesToInvalidate,
  onSubmit,
  order,
}: CreateModalProps) => {
  return (
    <BaseModal
      modalVisibility={modalVisibility}
      setModalVisibility={setModalVisibility}
    >
      <GenericModalLayout
        title="Order Tracking"
        subtitle={order.orderNumber}
        closeModal={() => setModalVisibility(false)}
      >
        <Formik
          initialValues={{
            carrier: order.tracking?.carrier || "",
            trackingNumber: order.tracking?.trackingNumber || "",
          }}
          validationSchema={NewOrderSchema}
          onSubmit={(values) => onSubmit(values)}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <div className="mb-4 ">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Carrier*
                </label>
                <Field
                  type="text"
                  name="carrier"
                  placeholder="Select a carrier"
                  options="asdads"
                  items={Object.keys(knownCarriers)}
                  component={ECombobox}
                />
                <ErrorMessage
                  name="carrier"
                  component="div"
                  className="text-xs text-red-400"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Tracking Number*
                </label>
                <Field
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  name="trackingNumber"
                  placeholder="9400123456"
                />
                <ErrorMessage
                  name="trackingNumber"
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
                >
                  Save Tracking
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </GenericModalLayout>
    </BaseModal>
  );
};

export default TrackingModal;
