import React from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Formik, Form, Field, ErrorMessage } from "formik";
import { createProject } from "../../../services/projectsServices";
import { useQueryClient } from "react-query";
interface ProjectFormProps {
  closeModal: () => void;
}
const CreateProjectForm = ({ closeModal }: ProjectFormProps) => {
  const queryClient = useQueryClient();

  return (
    <Formik
      initialValues={{ name: "", prefix: "", description: "" }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        await createProject(values);
        await queryClient.invalidateQueries("projects");
        closeModal();
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Part Name
            </label>
            <Field
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="name"
              placeholder="New Project"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Prefix
            </label>
            <Field
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="prefix"
              placeholder="696-2022"
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
          </div>

          <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button
              className="bg-emerald-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="submit"
              disabled={isSubmitting}
            >
              Create Project
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateProjectForm;
