"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const deleteCookies = async (keys) => {
  keys.forEach((key) => {
    cookies().delete(key);
  });
  redirect("/login");
};
