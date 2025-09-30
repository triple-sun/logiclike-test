import axios, { AxiosError } from "axios";

import { API_BASE_URL } from "../lib/const/const";

export const createApi = () => {
  const api = axios.create({
    baseURL: API_BASE_URL,
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response) {
        const { data } = error.response;

        let msg = "Ошибка";

        if (data && typeof data === "object") {
          if ("error" in data) {
            msg = typeof error === "object" ? (data.error as string) : error;
          }

          if ("message" in data) {
            msg = String(data.message);
          }
        }

        throw new Error(msg);
      }

      throw error;
    }
  );

  return api;
};

export default createApi();
