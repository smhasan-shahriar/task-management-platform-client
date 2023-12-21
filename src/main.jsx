import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router";
import AuthProvider from "./providers/AuthProvider";
import { ToastContainer } from "react-toastify";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import TaskProvider from "./providers/TaskProvider";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
     
      <AuthProvider>
        <TaskProvider>
        <RouterProvider router={router} />
        </TaskProvider>
      
        <ToastContainer />
      </AuthProvider>
      
    </QueryClientProvider>
  </React.StrictMode>
);
