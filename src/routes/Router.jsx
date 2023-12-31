import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import LogIn from "../pages/LogIn";
import Register from "../pages/Register";
import CreateTask from "../pages/CreateTask";
import UpdateTask from "../pages/UpdateTask";
import PrivateRoutes from "./PrivateRoutes";
import Contact from "../pages/Contact";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <ErrorPage />,
      children: [
        {
            path: "/",
            element: <Home></Home>
        },
        {
            path: "/login",
            element: <LogIn />
        },
        {
            path: "/register",
            element: <Register />
        },
        {
            path: "/createtask",
            element:  <PrivateRoutes><CreateTask /></PrivateRoutes> 
        },
        {
            path: "/updatetask/:id",
            element: <UpdateTask />
        },
        {
            path: "/contact",
            element: <Contact />
        }
        
      ]
    }
  ]);