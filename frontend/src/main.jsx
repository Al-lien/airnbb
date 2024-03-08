import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import AuthContextProvider from "./context/AuthContext";
import { ChildContextProvider } from "./context/ChildContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <ChildContextProvider>
      <App />
    </ChildContextProvider>
  </AuthContextProvider>
);
