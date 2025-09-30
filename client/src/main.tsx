import "./main.css";
import "dayjs/locale/ru";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./app/app";
import { API_BASE_URL } from "./lib/const/const";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);
dayjs.locale("ru");
dayjs.tz.setDefault("Europe/Moscow");

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

console.log({ API_BASE_URL }, import.meta.env);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
