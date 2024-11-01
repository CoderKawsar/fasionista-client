import {
  getFromLocalStorage,
  getNewAccessToken,
  setToLocalStorage,
} from "../services/authService";
import { setAccessToken } from "../services/authService";
import axios from "axios";

const api = () => {
  const Api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}`,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  Api.defaults.headers.post["Content-Type"] = "application/json";
  Api.defaults.headers["Accept"] = "application/json";
  Api.defaults.timeout = 60000;

  Api.interceptors.request.use(
    function (config) {
      const accessToken = getFromLocalStorage("access_token");

      if (accessToken) {
        config.headers.Authorization = accessToken;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  Api.interceptors.response.use(
    (response) => response,
    async function (error) {
      const config = error.config;
      if (error?.response?.status === 401 && !config.sent) {
        config.sent = true;
        const response = await getNewAccessToken();
        const accessToken = response?.data?.data?.accessToken;
        config.headers["Authorization"] = accessToken;
        setToLocalStorage("access_token", accessToken);
        setAccessToken(accessToken);
        return Api(config);
      } else {
        return Promise.reject(error);
      }
    }
  );

  return { Api };
};

export default api;
