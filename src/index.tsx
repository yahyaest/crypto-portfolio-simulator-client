import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { UserContextProvider } from "./user-context";
import { ToastContainer } from "react-toastify";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
  import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as Element | DocumentFragment
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <App />
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
