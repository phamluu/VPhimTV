import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const container = document.getElementById('root');
const root = createRoot(container!);

// Initialize dayjs plugin
dayjs.extend(utc);
dayjs.extend(customParseFormat);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
