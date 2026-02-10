import React, { useEffect } from "react";
import Header from "../../Common/Header";
import Sidebar from "../../Middle-Section/Sidebar";
import { FaGithub } from "react-icons/fa6";
import { FaEdit, FaExternalLinkAlt, FaTrash } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router";

export default function ViewCourses() {
  const [projectdata, setProjectdata] = useState([]);

  let viewApi = () => {
    axios
      .post(
        "https://dynmic-portfolio-my-website.onrender.com/api/backend/portfolio/view",
      )
      .then((result) => {
        if (result.data.status) {
          setProjectdata(result.data.data);
        } else {
          console.log(result.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let deleteProject = (id) => {
    console.log(id);
    axios
      .delete(
        `https://dynmic-portfolio-my-website.onrender.com/api/backend/portfolio/delete/${id}`,
      )
      .then((result) => {
        console.log(result);
        if (result.data.status) {
          viewApi();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let statusUpdate = (id, status) => {
    console.log(id, status);
    let obj = {
      id: id,
      status: !status,
    };

    axios
      .post(
        "https://dynmic-portfolio-my-website.onrender.com/api/backend/portfolio/status-change",
        obj,
      )
      .then((result) => {
        console.log(result);
        if (result.data.status) {
          viewApi();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    viewApi();
  }, []);
  return (
    <>
      <Header />
      <div className="w-[100%]">
        <div className="flex">
          <div>
            <Sidebar />
          </div>
          <div className="bg-[#d8d8ef] w-[100%]  ">
            <div className="w-[95%] mx-auto">
              {/* Heading + Search */}
              <div className="flex md:flex-row flex-col justify-between items-center mt-[60px] gap-4">
                <h1 className="capitalize font-bold text-[25px] text-center md:text-left">
                  welcome to view course table
                </h1>

                <div className="border rounded overflow-hidden flex">
                  <input
                    type="text"
                    className="px-4 py-2 outline-none"
                    placeholder="Search..."
                  />
                  <button className="bg-blue-600 px-4 flex items-center justify-center">
                    <svg
                      className="h-4 w-4 text-white"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto mt-[30px] bg-white rounded-lg shadow">
                <table className="w-full border-collapse text-sm">
                  <thead className="bg-gradient-to-r from-purple-600 to-blue-600">
                    <tr>
                      <th className="border border-purple-400 p-3 text-center text-white font-semibold">
                        S.No
                      </th>
                      <th className="border border-purple-400 p-3 text-center text-white font-semibold">
                        Project Image
                      </th>
                      <th className="border border-purple-400 p-3 text-center text-white font-semibold">
                        Project Title
                      </th>
                      <th className="border border-purple-400 p-3 text-center text-white font-semibold">
                        Description
                      </th>
                      <th className="border border-purple-400 p-3 text-center text-white font-semibold">
                        Technologies
                      </th>
                      <th className="border border-purple-400 p-3 text-center text-white font-semibold">
                        Frontend Repo
                      </th>
                      <th className="border border-purple-400 p-3 text-center text-white font-semibold">
                        Backend Repo
                      </th>
                      <th className="border border-purple-400 p-3 text-center text-white font-semibold">
                        Live Link
                      </th>
                      <th className="border border-purple-400 p-3 text-center text-white font-semibold">
                        Status
                      </th>
                      <th className="border border-purple-400 p-3 text-center text-white font-semibold">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {projectdata.length > 0
                      ? projectdata.map((project, index) => (
                          <tr
                            key={index}
                            className="hover:bg-purple-50 transition-colors"
                          >
                            <td className="border border-gray-300 p-3 text-center font-medium">
                              {index + 1}
                            </td>

                            <td className="border border-gray-300 p-3 text-center">
                              <img
                                src={project.image}
                                className="w-full h-[50px] object-cover"
                                alt={project.title}
                              />
                            </td>

                            <td className="border border-gray-300 p-3 text-center font-semibold text-gray-800">
                              {project.title}
                            </td>

                            <td className="border border-gray-300 p-3 text-left">
                              <p className="line-clamp-2 text-gray-600 text-xs max-w-[250px]">
                                {project.description}
                              </p>
                            </td>

                            <td className="border border-gray-300 p-3">
                              <div className="flex flex-wrap gap-1 justify-center max-w-[200px] mx-auto">
                                {project.technologies.map((tech, i) => (
                                  <span
                                    key={i}
                                    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </td>

                            <td className="border border-gray-300 p-3 text-center">
                              {project.github.frontend}
                            </td>

                            <td className="border border-gray-300 p-3 text-center">
                              {project.github.backend}
                            </td>

                            <td className="border border-gray-300 p-3 text-center">
                              {project.link}
                            </td>

                            <td className="border border-gray-300 p-3 text-center cursor-pointer">
                              <button
                                onClick={() =>
                                  statusUpdate(project._id, project.status)
                                }
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  project.status === true
                                    ? "bg-[green] text-[white]"
                                    : "bg-[red] text-[white]"
                                }`}
                              >
                                {project.status ? "active" : "inactive"}
                              </button>
                            </td>

                            <td className="border border-gray-300 p-3 text-center">
                              <div className="flex gap-2 justify-center">
                                <Link
                                  to={`/AddCourses/${project._id}`}
                                  className="cursor-pointer"
                                >
                                  <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-xs font-medium transition-all transform hover:scale-105 shadow-md cursor-pointer">
                                    <FaEdit />
                                  </button>
                                </Link>
                                <button
                                  onClick={() => deleteProject(project._id)}
                                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg text-xs font-medium transition-all transform hover:scale-105 shadow-md cursor-pointer"
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      : "No Data Found"}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
