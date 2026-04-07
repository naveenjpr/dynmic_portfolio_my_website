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
import Login from "./Pages/Login";
import { store } from "./Redux/store";
import { Provider } from "react-redux";
import Addcategory from "./DropDown/Category/Addcategory";
import Viewcategory from "./DropDown/Category/Viewcategory";
import { ToastContainer, toast } from "react-toastify";
import Addskills from "./DropDown/Skills/Addskills";
import Viewskills from "./DropDown/Skills/Viewskills";
import AddAchievements from "./DropDown/Achievements/AddAchievements";
import ViewAchievements from "./DropDown/Achievements/ViewAchievements";
import ViewClientSendMessage from "./DropDown/ClientSendMessage/ViewClientSendMessage";
import ViewConnectMe from "./DropDown/ConnectMe/ViewConnectMe";
import AddConnectMe from "./DropDown/ConnectMe/AddConnectMe";
import ViewSocial from "./DropDown/Social/ViewSocial";
import AddSocial from "./DropDown/Social/AddSocial";

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
    path: "/AddConnectMe/:id?",
    element: <AddConnectMe />,
  },
  {
    path: "/ViewConnectMe",
    element: <ViewConnectMe />,
  },
  {
    path: "/Addcategory/:id?",
    element: <Addcategory />,
  },
  {
    path: "/Viewcategory",
    element: <Viewcategory />,
  },
  {
    path: "/AddAchievements/:id?",
    element: <AddAchievements />,
  },
  {
    path: "/ViewAchievements",
    element: <ViewAchievements />,
  },

  {
    path: "/ViewClientMessage",
    element: <ViewClientSendMessage />,
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
    path: "/Addskills/:id?",
    element: <Addskills />,
  },
  {
    path: "/Viewskills",
    element: <Viewskills />,
  },
  {
    path: "/AddSocial/:id?",
    element: <AddSocial />,
  },
  {
    path: "/ViewSocial",
    element: <ViewSocial />,
  },
  {
    path: "/Sidebar",
    element: <Sidebar />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ToastContainer />
    <RouterProvider router={router} />
  </Provider>,
);
