import axios from "axios";
import Header from "../../Common/Header";
import Sidebar from "../../Middle-Section/Sidebar";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

export default function ViewExperience() {
  const [viewExperience, setviewExperience] = useState([]);
  let baseurl = import.meta.env.VITE_API_URL;

  const ExperienceView = () => {
    axios
      .post(
        `${baseurl}/api/backend/Experience/view`,
      )
      .then((res) => {
        if (res.data.status) {
          setviewExperience(res.data.data);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong");
      });
  };

  let toggleStatus = (id, status) => {
    let obj = {
      id,
      status: !status,
    };
    axios
      .post(
        `${baseurl}/api/backend/Experience/status-change/`,
        obj,
      )
      .then((res) => {
        if (res.data.status) {
          toast.success("status changed successfully");
          ExperienceView();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong");
      });
  };

  let deleteitem = (id) => {
    window.confirm("Are you sure you want to delete this item?") &&
      axios
        .delete(
          `${baseurl}/api/backend/Experience/delete/${id}`,
        )
        .then((res) => {
          if (res.data.status) {
            toast.success("Experience deleted successfully");
            ExperienceView();
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error("Something went wrong");
        });
  };

  useEffect(() => {
    ExperienceView();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white w-full">
      <Header />

      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:block w-64 border-r border-slate-800">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-x-auto">
          <div className="bg-slate-800 rounded-2xl shadow-lg p-5">
            {/* Title */}
            <div className="mb-5 flex justify-between items-center">
              <h2 className="text-xl md:text-2xl font-semibold">
                Experience List
              </h2>
              <Link to="/AddExperience">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-transform active:scale-95">
                  <FaPlus size={14} /> Add Experience
                </button>
              </Link>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                {/* Head */}
                <thead>
                  <tr className="bg-slate-700 text-gray-300 text-sm">
                    <th className="p-3 rounded-l-lg">No</th>
                    <th className="p-3">companyName</th>
                    <th className="p-3">companyLogo</th>
                    <th className="p-3">employmentType</th>
                    <th className="p-3">location</th>
                    <th className="p-3">startDate</th>
                    <th className="p-3">endDate</th>
                    <th className="p-3">duration</th>
                    <th className="p-3">description</th>
                    <th className="p-3">technologies</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 rounded-r-lg">Action</th>
                  </tr>
                </thead>

                {/* Body */}
                <tbody className="text-sm">
                  {viewExperience.length > 0 ? (
                    viewExperience.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-slate-700 hover:bg-slate-700 transition"
                      >
                        <td className="p-3">{index + 1}</td>

                        <td className="p-3">{item.companyName}</td>
                        <td className="p-3">
                          {item.companyLogo ? (
                            <img src={item.companyLogo} alt="Logo" className="w-12 h-12 object-contain bg-white rounded p-1 shadow-sm mx-auto" />
                          ) : (
                            <span className="text-gray-500 italic text-xs">No Logo</span>
                          )}
                        </td>
                        <td className="p-3 whitespace-nowrap">{item.employmentType}</td>
                        <td className="p-3">{item.location}</td>
                        <td className="p-3 whitespace-nowrap">{
                          item.startDate ? new Date(item.startDate).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }) : "N/A"
                        }</td>
                        <td className="p-3 whitespace-nowrap">{
                          item.endDate ? new Date(item.endDate).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }) : "Present"
                        }</td>
                        <td className="p-3">{item.duration}</td>
                        <td className="p-3 max-w-[150px] truncate" title={Array.isArray(item.description) ? item.description.join(", ") : item.description}>
                          {Array.isArray(item.description) ? item.description.join(", ") : item.description}
                        </td>
                        <td className="p-3">
                          <div className="flex flex-wrap gap-1">
                            {Array.isArray(item.technologies) ? item.technologies.map((tech, i) => (
                              <span key={i} className="bg-slate-700 px-2 py-0.5 rounded text-[10px]">{tech}</span>
                            )) : item.technologies}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="p-3">
                          <button
                            onClick={() => toggleStatus(item._id, item.status)}
                            className={`px-3 py-1 cursor-pointer rounded-full text-xs ${item.status == true
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                              }`}
                          >
                            {item.status ? "Active" : "Inactive"}
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="p-3 flex gap-2">
                          <Link
                            to={`/AddExperience/${item._id}`}
                            className="bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white p-2 rounded-lg transition-all"
                            title="Edit"
                          >
                            <FaEdit size={16} />
                          </Link>

                          <button
                            className="bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white p-2 rounded-lg transition-all cursor-pointer"
                            onClick={() => deleteitem(item._id)}
                            title="Delete"
                          >
                            <FaTrash size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center p-4 text-gray-400">
                        No data found
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
