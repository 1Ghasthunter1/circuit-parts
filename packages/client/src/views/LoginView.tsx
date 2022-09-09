import LoginLogo from "../media/loginlogo.png";
import { Formik, Form, ErrorMessage, Field, useFormikContext } from "formik";
import { loginUser, newLoginUser } from "../services/loginService";
import { useEffect, useState } from "react";
import { userState } from "../state/state";

import { useSnapshot } from "valtio";
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import * as yup from "yup";

const LoginView = () => {
  const [loginStatus, setLoginStatus] = useState<string>("");
  const [loginState, setLoginState] = useState<{
    email: string;
    password: string;
    errors?: { email?: string; password?: string };
  }>({ email: "", password: "" });

  const userSnapshot = useSnapshot(userState);
  const user = userSnapshot.user;

  let emailValidator = yup
    .string()
    .required("Required")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid Email");

  let passwordValidator = yup
    .string()
    .required("Required")
    .max(250, "Too Long!");

  const loginMutation = useMutation(
    async ({ email, password }: { email: string; password: string }) => {
      const resp = await newLoginUser(email, password);
      if (resp.data) userState.user = resp.data;
    },
    {
      onError: (e: AxiosError<{ error: string }>) => {
        switch (e.response?.data.error) {
          case "invalid credentials":
            console.log("bad creds");
            setLoginStatus("Invalid email or password");
            break;
          case "incorrect password":
            setLoginStatus("Invalid password");
            break;
          default:
            console.log("something else");
        }
      },
    }
  );

  interface ErrorsType {
    email?: string;
    password?: string;
  }

  const validateThing = async () => {
    let emailErrors = null;
    let passwordErrors = null;
    try {
      const emailValidation = await emailValidator.validateSync(
        loginState.email
      );
      emailErrors = null;
    } catch (e: any) {
      console.log(e.errors);
      emailErrors = e.errors[0];
    }

    try {
      const passwordValidation = await passwordValidator.validateSync(
        loginState.password
      );
      passwordErrors = null;
    } catch (e: any) {
      passwordErrors = e.errors[0];
    }
    setLoginState({
      ...loginState,
      errors: { email: emailErrors, password: passwordErrors },
    });
  };
  useEffect(() => {
    validateThing();
    console.log(loginState.errors);
  }, [loginState.email, loginState.password]);
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
                  onSubmit={(values) => {
                    loginMutation.mutate(values);
                  }}
                >
                  {({ dirty, isValid }) => {
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
                          disabled={
                            loginMutation.isLoading || !dirty || !isValid
                          }
                          className="w-full text-white bg-fuchsia-500 hover:bg-fuchsia-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-gray-400"
                        >
                          {loginMutation.isLoading && (
                            <FontAwesomeIcon
                              icon="circle-notch"
                              color="#FFFFFF"
                              className="mr-2 animate-spin"
                              size="lg"
                            />
                          )}
                          Sign in
                        </button>
                      </Form>
                    );
                  }}
                </Formik>
                <input
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="johndoe@team696.org"
                  onChange={(e) =>
                    setLoginState({ ...loginState, email: e.target.value })
                  }
                />
                <input
                  name="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="******"
                  onChange={(e) =>
                    setLoginState({ ...loginState, password: e.target.value })
                  }
                />
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
