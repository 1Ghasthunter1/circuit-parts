import LoginLogo from "../media/loginlogo.png";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { loginUser } from "../services/loginService";
import { useState } from "react";
import { userState } from "../state/state";

import { useSnapshot } from "valtio";
import { Navigate } from "react-router-dom";

const LoginView = () => {
  const [loginStatus, setLoginStatus] = useState<string>("");

  const userSnapshot = useSnapshot(userState);
  const user = userSnapshot.user;

  const handleSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const userObj = await loginUser(email, password);
    if (!userObj) return null;
    if ("error" in userObj) {
      setLoginStatus(userObj.error);
    } else {
      localStorage.setItem("user", JSON.stringify(userObj));
      userState.user = userObj;
    }
  };

  interface ErrorsType {
    email?: string;
    password?: string;
  }

  return (
    <>
      {!user ? (
        <div className="bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 h-screen">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a
              href="#"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <img className="h-16" src={LoginLogo} />
            </a>
            <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to 696 PMS
                </h1>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validate={(values) => {
                    const errors: ErrorsType = {};
                    if (!values.email) {
                      errors.email = "Email is Required";
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        values.email
                      )
                    ) {
                      errors.email = "Invalid email address";
                    }
                    if (!values.password)
                      errors.password = "Password is required";
                    return errors;
                  }}
                  onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    await handleSubmit(values);
                    setSubmitting(false);
                  }}
                >
                  {({ isSubmitting, dirty, isValid }) => {
                    return (
                      <Form className="space-y-4 md:space-y-6">
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Your Email
                          </label>
                          <Field
                            name="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="johndoe@team696.org"
                          />
                          <div className="text-xs text-rose-400">
                            <ErrorMessage name="email" component="div" />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Password
                          </label>
                          <Field
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          />
                          <div className="text-xs text-rose-400">
                            <ErrorMessage name="password" component="div" />
                          </div>
                        </div>
                        <div className="text-md text-rose-400">
                          {loginStatus}
                        </div>
                        <div className="flex items-center justify-between">
                          <a
                            href="mailto:hunterpruett2003@gmail.com?subject=Forgot%20PMS%20Password"
                            className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                          >
                            Forgot password?
                          </a>
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmitting || !dirty || !isValid}
                          className="w-full text-white bg-fuchsia-500 hover:bg-fuchsia-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-gray-400"
                        >
                          Sign in
                        </button>
                      </Form>
                    );
                  }}
                </Formik>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Need an account?{" "}
                  <a
                    href="mailto:hunterpruett2003@gmail.com?subject=PMS%Account%Creation"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Request Creation
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/projects" />
      )}
    </>
  );
};

export default LoginView;
