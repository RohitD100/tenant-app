import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { UserProvider } from "./context/UserProvider";
import "./index.css";
import DrawerAppBar from "./components/ResponsiveAppBar";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <DrawerAppBar>
        <RouterProvider router={router} />
      </DrawerAppBar>
    </UserProvider>
  </React.StrictMode>,
);
