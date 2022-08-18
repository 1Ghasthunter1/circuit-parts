import { Formik, Form, Field, ErrorMessage } from "formik";
import { Project } from "../../types/projectTypes";
import { createPart } from "../../services/partsServices";
import { useQuery } from "react-query";
import { fetchProjectComponents } from "../../services/projectsServices";
import { NewPart } from "../../types/partsTypes";
import { useQueryClient } from "react-query";

interface ProjectFormProps {
  closeModal: () => void;
  project: Project;
}

interface errorsType {
  name?: string;
  parent?: string;
}

const CreateProjectForm = ({ closeModal, project }: ProjectFormProps) => {
  const queryClient = useQueryClient();
  const { data } = useQuery(`${project.id}childAssemblies`, () =>
    fetchProjectComponents(project.id)
  );

  if (!data) {
    return null;
  }

  const allAssemblies = data.filter((entry) => entry.type === "assembly");

  return (
    <Formik
      initialValues={{
        name: "",
        parentId: "",
        description: "",
      }}
      validate={(values) => {
        const errors: errorsType = {};
        if (!values.name) {
          errors.name = "Required";
        }
        if (!values.parentId) {
          errors.parent = "Required";
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        const newPart: NewPart = {
          ...values,
          project: project.id,
          parent: { parentType: "assembly", parent: values.parentId },
        };
        await createPart(newPart);
        await queryClient.invalidateQueries("assembly");
        closeModal();
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, isValid }) => (
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
              Parent*
            </label>
            <Field
              as="select"
              className={`bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              type="select"
              name="parentId"
              placeholder="New Project"
            >
              {allAssemblies.length === 0 ? (
                <option disabled value="" className="text-red-300">
                  (No assemblies in this project)
                </option>
              ) : (
                <option disabled value="">
                  (Select a parent)
                </option>
              )}
              {allAssemblies.map((assy) => {
                return (
                  <option key={assy.id} value={assy.id}>
                    {assy.name} ({assy.partNumber})
                  </option>
                );
              })}
            </Field>
            <ErrorMessage
              name="parentId"
              component="div"
              className="text-xs text-red-400"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Part Name*
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
              disabled={isSubmitting || !isValid}
            >
              Create Part
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateProjectForm;
