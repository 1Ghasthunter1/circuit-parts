import GenericModalLayout from "./layouts/GenericModalLayout";
import BaseModal from "./base/BaseModal";
import Button from "../../elements/Button";
import { useMutation } from "react-query";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { NewUser } from "../../types/userTypes";
import { UserRole, userRoles } from "../../types/universalTypes";
import { createNewUser } from "../../services/usersService";
import { useQueryClient } from "react-query";

import * as Yup from "yup";
import { toast } from "react-toastify";

interface CreateModalProps {
  modalVisibility: boolean;
  setModalVisibility: (inp: boolean) => void;
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
    .max(30, "Too long!")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

Modal.setAppElement("#root");

const NewUserModal = ({
  modalVisibility,
  setModalVisibility,
}: CreateModalProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation((newUser: NewUser) => createNewUser(newUser), {
    onSuccess: async () => {
      queryClient.invalidateQueries("allUsers");
      setModalVisibility(false);
      toast.success("Created new user!");
    },
  });
  return (
    <BaseModal
      modalVisibility={modalVisibility}
      setModalVisibility={setModalVisibility}
    >
      <GenericModalLayout
        title={`New User`}
        closeModal={() => setModalVisibility(false)}
      >
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "user" as UserRole,
          }}
          validationSchema={NewUserSchema}
          onSubmit={(values, { setSubmitting }) => {
            if (!mutation.isLoading) {
              setSubmitting(true);
              const newUser: NewUser = {
                firstName: values.firstName,
                lastName: values.lastName,
                username: values.username,
                email: values.email,
                password: values.password,
                role: values.role,
              };

              mutation.mutate(newUser);
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
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

              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <Button
                  type="submit"
                  color="green"
                  iconName="user-plus"
                  isLoading={mutation.isLoading}
                >
                  Create User
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </GenericModalLayout>
    </BaseModal>
  );
};

export default NewUserModal;
