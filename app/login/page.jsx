"use client";

import api from "@/api/api";
import { setToLocalStorage } from "../../services/authService";
import Link from "next/link";
import toast from "react-hot-toast";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email_or_mobile = e.target.email_or_mobile.value;
    const password = e.target.password.value;

    try {
      await api()
        .Api({
          url: `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/users/login`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          data: {
            email_or_mobile,
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
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={loginHandler}>
              <div>
                <label
                  htmlFor="email_or_mobile"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="text"
                  name="email_or_mobile"
                  id="email_or_mobile"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Email or Mobile Number"
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
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-center justify-start">
                <Link
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </Link>
              </div>
              {loading && <LoadingSpinner />}
              <button
                type="submit"
                className="w-full text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 "
              >
                Log in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  href="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
