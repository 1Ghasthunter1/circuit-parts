import GenericModalLayout from "../modals/layouts/GenericModalLayout";
import BaseModal from "../modals/base/BaseModal";
import Button from "../../elements/Button";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { EditedUser, User } from "../../types/userTypes";
import { UseMutationResult } from "react-query";
import { AxiosResponse, AxiosError } from "axios";

import * as Yup from "yup";

interface CreateModalProps {
  modalVisibility: boolean;
  setModalVisibility: (inp: boolean) => void;
  user: User;
  editMutation: UseMutationResult<AxiosResponse, unknown, User, unknown>;
}

const NewUserSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Must be at least 3 characters long")
    .max(255, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(3, "Must be at least 3 characters long")
    .max(255, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  username: Yup.string()
    .min(3, "Must be at least 3 characters long")
    .max(255, "Too Long")
    .matches(/^(\S+$)/g, "Cannot contain any spaces")
    .required("Required"),
});

Modal.setAppElement("#root");

const EditDetails = ({
  modalVisibility,
  setModalVisibility,
  user,
  editMutation,
}: CreateModalProps) => {
  const mutationErrorObj = editMutation.error as
    | AxiosError<{ error: string }>
    | undefined;

  return (
    <BaseModal
      modalVisibility={modalVisibility}
      setModalVisibility={setModalVisibility}
    >
      <GenericModalLayout
        title={`Edit User`}
        closeModal={() => setModalVisibility(false)}
      >
        <Formik
          initialValues={{
            ...user,
            password: "",
            confirmPassword: "",
          }}
          validationSchema={NewUserSchema}
          onSubmit={(values) => {
            const updatedUserFormValues: EditedUser = {
              firstName: values.firstName,
              lastName: values.lastName,
              username: values.username,
              email: values.email,
              role: user.role,
              id: user.id,
            };
            if (values.password)
              updatedUserFormValues.password = values.password;

            editMutation.mutate(updatedUserFormValues);
          }}
        >
          {({ dirty, isValid }) => (
            <Form>
              {/* FIRST NAME */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  First Name*
                </label>
                <Field
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  name="firstName"
                  placeholder="New Project"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-xs text-red-400"
                />
              </div>

              {/* LAST NAME */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Last Name*
                </label>
                <Field
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  name="lastName"
                  placeholder="New Project"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-xs text-red-400"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Username*
                </label>
                <Field
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  name="username"
                  placeholder="New Project"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-xs text-red-400"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Email*
                </label>
                <Field
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="email"
                  name="email"
                  placeholder="New Project"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-xs text-red-400"
                />
              </div>

              {mutationErrorObj && (
                <div className="mt-2 text-rose-400 text-md pb-2">
                  <span>
                    {mutationErrorObj.response?.status === 409 ? (
                      <span>
                        {mutationErrorObj.response.data?.error ||
                          "Unknown Error"}
                      </span>
                    ) : (
                      "Unknown error"
                    )}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <Button
                  // className="bg-emerald-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                  bgColor="bg-green-600"
                  hoverColor="hover:bg-green-700"
                  txtColor="text-white"
                  iconName="pencil"
                  disabled={editMutation.isLoading || !dirty || !isValid}
                >
                  Save User
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </GenericModalLayout>
    </BaseModal>
  );
};

export default EditDetails;
