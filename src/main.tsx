/* eslint-disable @typescript-eslint/no-non-null-assertion */

import React from "react";
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import {PhrasesProvider} from "./context/PhrasesContext";
import App from "./app";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PhrasesProvider>
      <App />
    </PhrasesProvider>
  </StrictMode>,
);
