import React from "react";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import Home from "./Pages/Home";
import ViewCourses from "./DropDown/portfolio/ViewCourses";
import AddCourses from "./DropDown/portfolio/AddCourses";
import Sidebar from "./Middle-Section/Sidebar";
import AddResume from "./DropDown/Resume/AddResume";
import ViewResume from "./DropDown/Resume/ViewResume";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: <Home />,
  },
  {
    path: "/AddResume/:id?",
    element: <AddResume />,
  },
  {
    path: "/ViewResume",
    element: <ViewResume />,
  },
  {
    path: "/Addportfolio/:id?",
    element: <AddCourses />,
  },
  {
    path: "/Viewportfolio",
    element: <ViewCourses />,
  },
  {
    path: "/Sidebar",
    element: <Sidebar />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
