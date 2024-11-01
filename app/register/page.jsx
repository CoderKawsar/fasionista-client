"use client";

import api from "@/api/api";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const registerHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const full_name = e.target.full_name.value;
    const email = e.target.email.value;
    const mobile_number = e.target.mobile_number.value;
    const password = e.target.password.value;
    const confirm_password = e.target.confirm_password.value;

    if (password !== confirm_password) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await api()
        .Api({
          url: `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/users`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          data: {
            full_name,
            mobile_number,
            email,
            password,
          },
        })
        .then((res) => {
          if (res?.data?.success === true) {
            toast.success(res.data?.message);
            setToLocalStorage("access_token", res.data?.data?.accessToken);
            setLoading(false);
            router.push("/");
          }
        });
    } catch (error) {
      if (error?.response?.data?.errorMessages?.length) {
        error?.response?.data?.errorMessages?.map((err) =>
          toast.error(err?.message)
        );
      } else if (error?.response?.data?.error) {
        toast.error(error?.response?.data?.error);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-6" onSubmit={registerHandler}>
              <div>
                <label
                  htmlFor="full_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="full_name"
                  id="full_name"
                  placeholder="John Doe"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="mobile_number"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobile_number"
                  id="mobile_number"
                  placeholder="01710123456"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@example.com"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  minLength={8}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirm_password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  minLength={8}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
