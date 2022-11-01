import GenericModalLayout from "../modals/layouts/GenericModalLayout";
import BaseModal from "../modals/base/BaseModal";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation, UseQueryResult } from "react-query";
import * as Yup from "yup";
import Button from "../../elements/Button";
import toast from "react-hot-toast";
import { Project } from "~/types/projectTypes";
import { IOrderToServer, Order } from "~/types/orderTypes";
import { createOrder } from "~/services/ordersService";
import { projectState } from "~/state/state";
import { useSnapshot } from "valtio";
import ECombobox from "~/elements/ECombobox";

interface CreateModalProps {
  modalVisibility: boolean;
  setModalVisibility: (inp: boolean) => void;
  project: Project;
  queriesToInvalidate?: UseQueryResult[];
}

const NewOrderSchema = Yup.object().shape({
  orderNumber: Yup.string()
    .min(3, "Must be at least 3 characters long")
    .max(255, "Too Long!")
    .required("Required"),
  vendor: Yup.string()
    .min(3, "Must be at least 3 characters long")
    .max(255, "Too Long!")
    .required("Required"),
});

Modal.setAppElement("#root");

const NewOrderModal = ({
  modalVisibility,
  setModalVisibility,
  queriesToInvalidate,
  project,
}: CreateModalProps) => {
  const projectSnap = useSnapshot(projectState).project;
  const createOrderMutation = useMutation(
    async (newOrder: IOrderToServer) => await createOrder(newOrder),
    {
      onSuccess: async (newOrder) => {
        if (queriesToInvalidate)
          queriesToInvalidate.map((query) => query.refetch());
        setModalVisibility(false);
        toast.success(`Created ${newOrder.data.orderNumber}`);
      },
    }
  );

  return (
    <BaseModal
      modalVisibility={modalVisibility}
      setModalVisibility={setModalVisibility}
    >
      <GenericModalLayout
        title="Create New Order"
        subtitle={project.prefix}
        closeModal={() => setModalVisibility(false)}
      >
        <Formik
          initialValues={{
            orderNumber: "",
            vendor: "",
          }}
          validationSchema={NewOrderSchema}
          onSubmit={(values) =>
            createOrderMutation.mutate({
              ...values,
              status: "open",
              project: projectSnap?.id || "",
            })
          }
        >
          {({ isSubmitting, values }) => (
            <Form>
              <div className="mb-4 ">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Project*
                </label>
                <Field
                  className={`cursor-not-allowed bg-gray-200 border border-gray-300 text-sm rounded-lg text-gray-400 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  type="text"
                  name="project"
                  placeholder={`${project.name} (${project.prefix})`}
                  value={`${project.name} (${project.prefix})`}
                  disabled={true}
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Order Number*
                </label>
                <Field
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  name="orderNumber"
                  placeholder="123-456789"
                />
                <ErrorMessage
                  name="orderNumber"
                  component="div"
                  className="text-xs text-red-400"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Vendor
                </label>
                <Field
                  type="text"
                  name="vendor"
                  placeholder="Select a vendor"
                  options="asdads"
                  component={ECombobox}
                />
                <ErrorMessage
                  name="vendor"
                  component="div"
                  className="text-xs text-red-400"
                />
              </div>

              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <Button
                  type="submit"
                  style="primary"
                  color="green"
                  iconName="plus"
                  isLoading={isSubmitting}
                >
                  Create Order
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </GenericModalLayout>
    </BaseModal>
  );
};

export default NewOrderModal;
