import React from "react"
import "./index.css"
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom"
import ReactDOM from "react-dom/client"
import Home from "./Pages/Home"
import ViewCourses from "./DropDown/portfolio/ViewCourses"
import AddCourses from "./DropDown/portfolio/AddCourses"
import Sidebar from "./Middle-Section/Sidebar"



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/AddCourses/:id?",
    element: <AddCourses />,
  },
  {
    path: "/ViewCourses",
    element: <ViewCourses />,
  }, {
    path: "/Sidebar",
    element: <Sidebar />
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)


