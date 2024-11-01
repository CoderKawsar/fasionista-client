import api from "@/api/api";
import { decodedToken } from "@/utils/jwt";
import { deleteCookies } from "./deleteCookie";
import toast from "react-hot-toast";

export const getNewAccessToken = async () => {
  return await api().Api({
    url: `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/users/refresh-token`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};

export const setToLocalStorage = (key, token) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.setItem(key, token);
};

export const setAccessToken = (token, option) => {
  cookies().set("access_token", token, {
    secure: true,
    httpOnly: true,
  });

  if (option && option.redirect) {
    redirect(option.redirect);
  }
};

export const setToSessionStorage = (key, token) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return sessionStorage.setItem(key, token);
};

export const getFromLocalStorage = (key) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(key);
};

export const getFromSessionStorage = (key) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return sessionStorage.getItem(key);
};

export const removeFromLocalStorage = (key) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.removeItem(key);
};

export const storeUserInfo = ({ accessToken }) => {
  return setToLocalStorage("access_token", accessToken);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage("access_token");
  if (authToken) {
    const decodedData = decodedToken(authToken);
    return {
      role: decodedData?.role.toLowerCase(),
      user_id: decodedData?.user_id,
    };
  } else {
    return "";
  }
};

export const isLoggedIn = () => {
  const authToken = getFromLocalStorage("access_token");
  if (authToken) {
    return true;
  } else {
    return false;
  }
};

export const logout = () => {
  removeFromLocalStorage("access_token");
  deleteCookies(["access_token", "refresh_token"]);
  toast.success("Logout successful!");
};
