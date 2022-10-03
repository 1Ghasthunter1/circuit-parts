import GenericModalLayout from "../modals/layouts/GenericModalLayout";
import BaseModal from "../modals/base/BaseModal";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { useMutation, UseQueryResult } from "react-query";

import * as Yup from "yup";
import { Parent } from "../../types/universalTypes";
import Button from "../../elements/Button";
import { toast } from "react-toastify";
import { NewProject, Project, UnpopulatedProject } from "~/types/projectTypes";
import {
  createProject,
} from "~/services/projectsServices";

interface CreateModalProps {
  modalVisibility: boolean;
  setModalVisibility: (inp: boolean) => void;
  queriesToInvalidate: UseQueryResult[];
}

const NewProjectFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Must be at least 3 characters long")
    .max(255, "Too Long!")
    .required("Required"),
  prefix: Yup.string().required("Required"),
  description: Yup.string().max(255, "Too Long!"),
});

Modal.setAppElement("#root");

const CreateProjectModal = ({
  modalVisibility,
  setModalVisibility,
  queriesToInvalidate,
}: CreateModalProps) => {
  const createProjectMutation = useMutation(
    async (newProject: NewProject) => await createProject(newProject),
    {
      onSuccess: async (newProject) => {
        queriesToInvalidate.map((query) => query.refetch());
        setModalVisibility(false);
        toast.success(`Created ${newProject?.name}`);
      },
    }
  );

  return (
    <BaseModal
      modalVisibility={modalVisibility}
      setModalVisibility={setModalVisibility}
    >
      <GenericModalLayout
        title="Create New Project"
        closeModal={() => setModalVisibility(false)}
      >
        <Formik
          initialValues={{
            name: "",
            prefix: "",
            description: "",
          }}
          validationSchema={NewProjectFormSchema}
          onSubmit={(values) => {
            createProjectMutation.mutate(values);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Project Name*
                </label>
                <Field
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  name="name"
                  placeholder="New Project"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-xs text-red-400"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Prefix*
                </label>
                <Field
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  name="prefix"
                  placeholder="696-2024"
                />
                <ErrorMessage
                  name="prefix"
                  component="div"
                  className="text-xs text-red-400"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Description
                </label>
                <Field
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  name="description"
                  placeholder="Lorem ipsum..."
                />
                <ErrorMessage
                  name="description"
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
                  Create Project
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </GenericModalLayout>
    </BaseModal>
  );
};

export default CreateProjectModal;
