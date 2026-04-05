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
  let baseurl = import.meta.env.VITE_API_URL;

  let viewApi = () => {
    axios
      .post(
        `${baseurl}/api/backend/portfolio/view`,
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
        `${baseurl}/api/backend/portfolio/delete/${id}`,
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
        `${baseurl}/api/backend/portfolio/status-change`,
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
    <div className="min-h-screen bg-slate-900 text-white w-full">
      <Header />

      <div className="flex">
        <div className="hidden md:block w-64 border-r border-slate-800 ">
          <Sidebar />
        </div>

        <main className="flex-1 p-6 md:p-10 ">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h1 className="text-3xl font-bold">📁 Portfolio Projects</h1>

            <input
              type="text"
              placeholder="Search project..."
              className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* TABLE CARD */}
          <div className="bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <tr>
                    <th className="p-4">#</th>
                    <th className="p-4">Image</th>
                    <th className="p-4">Title</th>
                    <th className="p-4">Tech</th>
                    <th className="p-4">Links</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {projectdata.length > 0 ? (
                    projectdata.map((project, index) => (
                      <tr
                        key={index}
                        className="border-b border-slate-700 hover:bg-slate-700/50 transition"
                      >
                        {/* INDEX */}
                        <td className="p-4 text-center">{index + 1}</td>

                        {/* IMAGE */}
                        <td className="p-4">
                          <img
                            src={project.image}
                            className="w-20 h-12 object-cover rounded-md"
                            alt=""
                          />
                        </td>

                        {/* TITLE */}
                        <td className="p-4 font-semibold">{project.title}</td>

                        {/* TECHNOLOGIES */}
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.map((tech, i) => (
                              <span
                                key={i}
                                className="bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded text-xs"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* LINKS */}
                        <td className="p-4 space-y-1 text-xs">
                          {project.github?.frontend && (
                            <a
                              href={project.github.frontend}
                              target="_blank"
                              className="flex items-center gap-1 text-blue-400 hover:underline cursor-pointer"
                            >
                              <FaGithub /> Frontend
                            </a>
                          )}
                          {project.github?.backend && (
                            <a
                              href={project.github.backend}
                              target="_blank"
                              className="flex items-center gap-1 text-green-400 hover:underline cursor-pointer"
                            >
                              <FaGithub /> Backend
                            </a>
                          )}
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              className="flex items-center gap-1 text-purple-400 hover:underline cursor-pointer"
                            >
                              <FaExternalLinkAlt /> Live
                            </a>
                          )}
                        </td>

                        {/* STATUS */}
                        <td className="p-4 text-center">
                          <button
                            onClick={() =>
                              statusUpdate(project._id, project.status)
                            }
                            className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer ${project.status
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                              }`}
                          >
                            {project.status ? "Active" : "Inactive"}
                          </button>
                        </td>

                        {/* ACTION */}
                        <td className="p-4">
                          <div className="flex gap-2 justify-center">
                            <Link to={`/Addportfolio/${project._id}`}>
                              <button className="p-2 bg-blue-500 hover:bg-blue-600 rounded-lg cursor-pointer">
                                <FaEdit />
                              </button>
                            </Link>

                            <button
                              onClick={() => deleteProject(project._id)}
                              className="p-2 bg-red-500 hover:bg-red-600 rounded-lg cursor-pointer"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center p-6 text-gray-400">
                        No Projects Found 🚫
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
