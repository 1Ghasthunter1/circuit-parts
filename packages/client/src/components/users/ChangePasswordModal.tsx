import GenericModalLayout from "../modals/layouts/GenericModalLayout";
import BaseModal from "../modals/base/BaseModal";
import Button from "../../elements/Button";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PasswordStrengthBar from "react-password-strength-bar";

import { NewUserPassword, User } from "../../types/userTypes";
import { UseMutationResult } from "react-query";
import { AxiosResponse, AxiosError } from "axios";

import * as Yup from "yup";

interface CreateModalProps {
  modalVisibility: boolean;
  setModalVisibility: (inp: boolean) => void;
  editMutation: UseMutationResult<
    AxiosResponse<User> | null,
    unknown,
    NewUserPassword,
    unknown
  >;
}

const NewPwdSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(4, "Must be at least 4 characters long")
    .max(30, "Too long!")
    .required("Required"),
  newPassword: Yup.string()
    .min(4, "Must be at least 4 characters long")
    .max(30, "Too long!")
    .required("Required"),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Required"),
});

Modal.setAppElement("#root");

const ChangePasswordModal = ({
  modalVisibility,
  setModalVisibility,
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
        title="Change Password"
        closeModal={() => setModalVisibility(false)}
      >
        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          }}
          validationSchema={NewPwdSchema}
          onSubmit={(values) => {
            const newPasswordFormValues: NewUserPassword = {
              oldPassword: values.currentPassword,
              newPassword: values.newPassword,
            };

            editMutation.mutate(newPasswordFormValues);
          }}
        >
          {({ dirty, isValid, values }) => (
            <Form>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Current Password*
                </label>
                <Field
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="password"
                  name="currentPassword"
                  placeholder="Current Password"
                />
                <ErrorMessage
                  name="currentPassword"
                  component="div"
                  className="text-xs text-red-400"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  New Password*
                </label>
                <Field
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                />
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-xs text-red-400"
                />
              </div>
              <PasswordStrengthBar
                password={values.newPassword}
                style={{
                  display: "block",
                  width: "100%",
                  height: 38,
                  padding: "6px 10px",
                  fontSize: 24,
                }}
              />

              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Confirm Password*
                </label>
                <Field
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="password"
                  name="confirmNewPassword"
                  placeholder="New Password"
                />
                <ErrorMessage
                  name="confirmNewPassword"
                  component="div"
                  className="text-xs text-red-400"
                />
              </div>

              {mutationErrorObj && (
                <div className="mt-2 text-rose-400 text-md pb-2">
                  <span>
                    {mutationErrorObj.response?.status === 403 ? (
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
                  iconName="check"
                  disabled={editMutation.isLoading || !dirty || !isValid}
                >
                  Change Password
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </GenericModalLayout>
    </BaseModal>
  );
};

export default ChangePasswordModal;
