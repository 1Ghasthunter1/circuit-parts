import { Formik, Form, Field, ErrorMessage } from "formik";
import { Project } from "../../types/projectTypes";
import { createAssembly } from "../../services/assemblyServices";
import { fetchProjectAssemblies } from "../../services/projectsServices";
import { NewAssembly } from "../../types/assemblyTypes";
import { UseQueryResult, useQueryClient, useQuery } from "react-query";

interface FormProps {
  closeModal: () => void;
  project: Project;
  queriesToInvalidate: UseQueryResult[];
}

interface errorsType {
  name?: string;
  parent?: string;
}

const CreateAssemblyForm = ({
  closeModal,
  project,
  queriesToInvalidate,
}: FormProps) => {
  const queryClient = useQueryClient();
  const { data } = useQuery(`/assemblies?project=${project.id}`, () =>
    fetchProjectAssemblies(project.id)
  );

  if (!data) return null;
  const allAssemblies = data;

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
        let parentType: "project" | "assembly" = "assembly";
        if (values.parentId.startsWith("PROJECT:")) {
          parentType = "project";
        }
        const newAssembly: NewAssembly = {
          ...values,
          project: project.id,
          parent: {
            parentType: parentType,
            parent: values.parentId.replace("PROJECT:", ""),
          },
        };
        await createAssembly(newAssembly);
        queriesToInvalidate.map(async (query) => await query.refetch());
        await queryClient.invalidateQueries(`/projects/${project.id}`);
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
              <option disabled value="">
                (Select a parent)
              </option>

              <option value={`PROJECT:${project.id}`}>
                Project: {`${project.name} (${project.prefix})`}
              </option>

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
              Assembly Name*
            </label>
            <Field
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="name"
              placeholder="Assembly Name"
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
              Create Assembly
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateAssemblyForm;
