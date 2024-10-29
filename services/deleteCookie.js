"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const deleteCookies = (keys) => {
  keys.forEach((key) => {
    cookies().delete(key);
  });
  redirect("/login");
};
