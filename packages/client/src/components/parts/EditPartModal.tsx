import GenericModalLayout from "../modals/layouts/GenericModalLayout";
import BaseModal from "../modals/base/BaseModal";
// import Button from "../../elements/Button";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { useMutation, UseQueryResult } from "react-query";

import * as Yup from "yup";
import { EditedPart, isPartStatus, Part } from "../../types/partsTypes";
import {
  isPriority,
  partStatuses,
  priorities,
} from "../../types/universalTypes";
import { Assembly } from "../../types/assemblyTypes";
import { editPart } from "../../services/partsServices";
import Button from "../../elements/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CreateModalProps {
  modalVisibility: boolean;
  setModalVisibility: (inp: boolean) => void;
  part: Part;
  queryToRefresh: UseQueryResult<(Part | Assembly)[], unknown>;
}

const EditedPartSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Must be at least 3 characters long")
    .max(255, "Too Long!")
    .required("Required"),
  status: Yup.string()
    .test("is_status", (status) => isPartStatus(status || ""))
    .required("Required"),
  priority: Yup.string()
    .test("is_status", (priority) => isPriority(priority || ""))
    .required("Required"),
  sourceMaterial: Yup.string()
    .min(3, "Must be at least 3 characters long")
    .max(500, "Too Long!"),
  haveMaterial: Yup.boolean(),
  quantityRequired: Yup.number().positive(
    "You can't make negative things, come on now!"
  ),
  materialCutLength: Yup.string().max(500, "Too Long!"),
  notes: Yup.string().max(2000, "Too Long"),
});

Modal.setAppElement("#root");

const EditDetails = ({
  modalVisibility,
  setModalVisibility,
  part,
  queryToRefresh,
}: CreateModalProps) => {
  const editPartMutation = useMutation(
    async (values: EditedPart) => await editPart(part.id, values),
    {
      onSuccess: async () => {
        await queryToRefresh.refetch();
        setModalVisibility(false);
      },
    }
  );

  return (
    <BaseModal
      modalVisibility={modalVisibility}
      setModalVisibility={setModalVisibility}
    >
      <GenericModalLayout
        title={`Edit ${part.name}`}
        subtitle={part.partNumber}
        closeModal={() => setModalVisibility(false)}
      >
        <Formik
          initialValues={
            {
              name: part.name,
              status: part.status,
              priority: part.priority,
              sourceMaterial: part.sourceMaterial,
              haveMaterial: part.haveMaterial,
              quantityRequired: part.quantityRequired,
              materialCutLength: part.materialCutLength,
              notes: part.notes,
            } as EditedPart
          }
          validationSchema={EditedPartSchema}
          onSubmit={(values) => {
            editPartMutation.mutate(values);
          }}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <div className="space-y-4	">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Part Name
                  </label>
                  <Field
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    name="name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-xs text-red-400"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Status
                  </label>
                  <Field
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    as="select"
                    type="select"
                    name="status"
                  >
                    {partStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="status"
                    component="div"
                    className="text-xs text-red-400"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Priority
                  </label>
                  <Field
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    as="select"
                    type="select"
                    name="priority"
                  >
                    {priorities.map((priority) => (
                      <option key={priority} value={priority}>
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="priority"
                    component="div"
                    className="text-xs text-red-400"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Source Material
                  </label>
                  <Field
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    name="sourceMaterial"
                  />
                  <ErrorMessage
                    name="sourceMaterial"
                    component="div"
                    className="text-xs text-red-400"
                  />
                </div>

                <div className="flex">
                  <label className="block mb-2 mr-4 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Have Material
                  </label>
                  <Field
                    className="w-5 h-5 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    type="checkbox"
                    name="haveMaterial"
                  />
                  <ErrorMessage
                    name="haveMaterial"
                    component="div"
                    className="text-xs text-red-400"
                  />
                </div>

                <div className="overflow-auto">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Quantity Required
                  </label>
                  <Field
                    className="float-left bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="number"
                    name="quantityRequired"
                  />
                  <ErrorMessage
                    name="quantityRequired"
                    component="div"
                    className="text-xs text-red-400"
                  />
                </div>

                <div className="overflow-auto">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Material Cut Length
                  </label>
                  <Field
                    className="float-left bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="input"
                    name="materialCutLength"
                  />
                  <ErrorMessage
                    name="materialCutLength"
                    component="div"
                    className="text-xs text-red-400"
                  />
                </div>

                <div className="overflow-auto">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Notes
                  </label>
                  <Field
                    className="float-left bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="input"
                    name="notes"
                  />
                  <ErrorMessage
                    name="notes"
                    component="div"
                    className="text-xs text-red-400"
                  />
                </div>

                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <Button
                    className="bg-emerald-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    disabled={isSubmitting || !isValid}
                  >
                    <div>
                      {!isSubmitting && <FontAwesomeIcon icon="check" />}
                      {isSubmitting && (
                        <span className="animate-spin">
                          <FontAwesomeIcon icon="circle-notch" />
                        </span>
                      )}{" "}
                      Save Part
                    </div>
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </GenericModalLayout>
    </BaseModal>
  );
};

export default EditDetails;
