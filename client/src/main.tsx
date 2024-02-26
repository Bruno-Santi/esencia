import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "./index.css";

//@ts-expect-error 'efefe'
import { Dashboard } from "./Dashboard.tsx";
import ReactGA from "react-ga/types";
const TRACKING_ID = "G-TX9FWF4RZR";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <ToastContainer
      position='bottom-center'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='dark'
    />
    <Dashboard />
  </>
);
