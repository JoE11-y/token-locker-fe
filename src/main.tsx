import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { Connect } from "@stacks/connect-react";

import { userSession } from "./user-session";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Connect
      authOptions={{
        appDetails: {
          name: "Memegoat Distributor",
          icon: window.location.origin + "/logo.png",
        },
        redirectTo: "/",
        onFinish: () => {
          window.location.reload();
        },
        userSession,
      }}
    >
      <App />
    </Connect>
  </React.StrictMode>
);
