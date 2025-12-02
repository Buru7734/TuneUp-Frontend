import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { UserProvider } from "./context/userContext.jsx";

import App from "./App.jsx";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* Wrap the UserProvider around the App */}
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
);
