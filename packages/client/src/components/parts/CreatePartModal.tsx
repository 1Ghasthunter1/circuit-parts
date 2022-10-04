import GenericModalLayout from "../modals/layouts/GenericModalLayout";
import BaseModal from "../modals/base/BaseModal";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";

import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";

import * as Yup from "yup";
import { NewPart } from "../../types/partsTypes";
import { Parent } from "../../types/universalTypes";
import { createPart } from "../../services/partsServices";
import Button from "../../elements/Button";
import toast from "react-hot-toast";
import { Project, UnpopulatedProject } from "~/types/projectTypes";
import { fetchProjectAssemblies } from "~/services/projectsServices";

interface CreateModalProps {
  modalVisibility: boolean;
  setModalVisibility: (inp: boolean) => void;
  project: UnpopulatedProject | Project;
  parent?: Parent;
  queriesToInvalidate: UseQueryResult[];
}

const NewPartFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Must be at least 3 characters long")
    .max(255, "Too Long!")
    .required("Required"),
  parentId: Yup.string().required("Required"),
  description: Yup.string().max(255, "Too Long!"),
});

Modal.setAppElement("#root");

const CreatePartModal = ({
  modalVisibility,
  setModalVisibility,
  queriesToInvalidate,
  project,
  parent,
}: CreateModalProps) => {
  const queryClient = useQueryClient();

  const createPartMutation = useMutation(
    async (newPart: NewPart) => await createPart(newPart),
    {
      onSuccess: async (newPart) => {
        queriesToInvalidate.map((query) => query.refetch());
        setModalVisibility(false);
        toast.success(`Created ${newPart.name}`);
      },
    }
  );

  const parentQueries = useQuery(`assemblies?project=${project.id}`, () =>
    fetchProjectAssemblies(project.id)
  );

  if (!parentQueries.data) return null;

  const allAssemblies = parentQueries.data;

  return (
    <BaseModal
      modalVisibility={modalVisibility}
      setModalVisibility={setModalVisibility}
    >
      <GenericModalLayout
        title="Create New Part"
        subtitle={project.prefix}
        closeModal={() => setModalVisibility(false)}
      >
        <Formik
          initialValues={{
            name: "",
            project: project.id,
            parentId: parent?.parent || "",
            description: "",
          }}
          validationSchema={NewPartFormSchema}
          onSubmit={(newPart) =>
            createPartMutation.mutate({
              ...newPart,
              parent: { parent: newPart.parentId, parentType: "assembly" },
            })
          }
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
                  Create Part
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </GenericModalLayout>
    </BaseModal>
  );
};

export default CreatePartModal;
