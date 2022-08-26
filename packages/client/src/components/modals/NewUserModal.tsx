import GenericModalLayout from "./layouts/GenericModalLayout";
import BaseModal from "./base/BaseModal";
import Button from "../../elements/Button";
import { useMutation } from "react-query";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { NewUser } from "../../types/userTypes";
import { UserRole } from "../../types/universalTypes";
import { createNewUser } from "../../services/usersService";
import * as Yup from "yup";

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
  const mutation = useMutation((newUser: NewUser) => createNewUser(newUser));
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
            setModalVisibility(false);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, dirty }) => (
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
                  <option value={"user"}>User</option>
                  <option value={"admin"}>Admin</option>
                </Field>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-xs text-red-400"
                />
              </div>

              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <Button
                  // className="bg-emerald-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                  bgColor="bg-green-500"
                  hoverColor="hover:bg-green-600"
                  txtColor="text-white"
                  iconName="user-plus"
                  disabled={isSubmitting || !dirty}
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
