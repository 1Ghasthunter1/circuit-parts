import GenericModalLayout from "../modals/layouts/GenericModalLayout";
import BaseModal from "../modals/base/BaseModal";
import Button from "../../elements/Button";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { EditedUser, User } from "../../types/userTypes";
import { UseMutationResult } from "react-query";
import { AxiosResponse, AxiosError } from "axios";

import * as Yup from "yup";
import { userRoles } from "../../types/universalTypes";

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
  password: Yup.string()
    .min(4, "Must be at least 4 characters long")
    .max(30, "Too long!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .when("password", {
      is: (password: string) => password?.length > 0,
      then: Yup.string().required("Required if 'Password' is filled out"),
    }),
});

Modal.setAppElement("#root");

const EditUserModal = ({
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
            if (!editMutation.isLoading) {
              const updatedUserFormValues: EditedUser = {
                firstName: values.firstName,
                lastName: values.lastName,
                username: values.username,
                email: values.email,
                role: values.role,
                id: user.id,
              };
              if (values.password)
                updatedUserFormValues.password = values.password;

              editMutation.mutate(updatedUserFormValues);
            }
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

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Password*
                </label>
                <Field
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="password"
                  name="password"
                  placeholder="New Project"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-xs text-red-400"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Confirm Password*
                </label>
                <Field
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="password"
                  name="confirmPassword"
                  placeholder="New Project"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-xs text-red-400"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Role*
                </label>
                <Field
                  as="select"
                  className={`bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  type="select"
                  name="role"
                  placeholder="New Project"
                >
                  {userRoles.map((role) => (
                    <option value={role} key={role}>
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="role"
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
                  type="submit"
                  color="green"
                  iconName="check"
                  isLoading={editMutation.isLoading}
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

export default EditUserModal;
