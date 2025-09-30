import { AxiosError } from "axios";

import { SerializedError } from "../interfaces/error.interfaces";

const getAxiosErrorMessage = (error: AxiosError) => {
  const responseData = error.response?.data;

  if (
    responseData &&
    typeof responseData === "object" &&
    "message" in responseData &&
    typeof responseData.message === "string"
  ) {
    return responseData.message;
  }

  return error.message;
};

/** Обработка ошибок */
export const serializeAxiosError = (error: AxiosError): SerializedError => ({
  name: error.code?.toString() || error.status?.toString(),
  message: getAxiosErrorMessage(error),
  code: String(error.status),
  stack: error.stack,
});
