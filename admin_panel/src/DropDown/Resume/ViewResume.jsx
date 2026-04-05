import React, { useEffect, useState } from "react";
import Header from "../../Common/Header";
import Sidebar from "../../Middle-Section/Sidebar";
import { FaEdit, FaTrash, FaFilePdf, FaImage, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ViewResume() {
  const [resumeData, setResumeData] = useState([]);
  let baseurl = import.meta.env.VITE_API_URL;

  let resumeDataView = () => {
    axios
      .post(
        `${baseurl}/api/backend/Resume/view`,
      )
      .then((res) => {
        console.log(res.data.data);
        setResumeData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    resumeDataView();
  }, []);
  const [searchTerm, setSearchTerm] = useState("");

  const deleteResume = (id) => {
    if (window.confirm("Are you sure you want to delete this resume?")) {
      axios
        .delete(
          `${baseurl}/api/backend/Resume/delete/${id}`,
        )
        .then((res) => {
          console.log(res.data);
          resumeDataView();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const statusUpdate = (id, currentStatus) => {
    let obj = {
      id: id,
      status: !currentStatus,
    };
    axios
      .post(
        "https://dynmic-portfolio-my-website.onrender.com/api/backend/Resume/status-change",
        obj,
      )
      .then((res) => {
        console.log(res.data);
        resumeDataView();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filteredData = resumeData.filter(
    (resume) =>
      (resume.file_type || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (resume.status ? "active" : "inactive").includes(
        searchTerm.toLowerCase(),
      ),
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200">
      <Header />
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:block w-72 shrink-0 border-r border-slate-800">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-x-hidden">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
                  Resumes Management
                </h1>
                <p className="text-slate-400">
                  Manage and monitor your uploaded resumes.
                </p>
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400">
                  <FaSearch size={14} />
                </div>
                <input
                  type="text"
                  placeholder="Search by type or status..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full md:w-80 pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all shadow-lg"
                />
              </div>
            </div>

            {/* Table Card */}
            <div className="relative group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950/50">
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                        S.No
                      </th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Preview
                      </th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                        File Type
                      </th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredData.length > 0 ? (
                      filteredData.map((resume, index) => (
                        <tr
                          key={resume._id}
                          className="hover:bg-slate-800/30 transition-colors group/row"
                        >
                          <td className="px-6 py-4 text-sm text-slate-300">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4">
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-slate-700 bg-slate-950 flex items-center justify-center">
                              {resume.file_type === "raw" ? (
                                <FaFilePdf
                                  className="text-red-400 w-8 h-8"
                                  title="PDF File"
                                />
                              ) : (
                                <img
                                  src={resume.image}
                                  alt="Resume"
                                  className="w-full h-full object-cover"
                                />
                              )}
                              <a
                                href={resume.image}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute inset-0 bg-slate-900/80 opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center text-[10px] text-white font-bold"
                              >
                                VIEW
                              </a>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${resume.file_type === "raw"
                                ? "bg-red-500/10 text-red-400"
                                : "bg-indigo-500/10 text-indigo-400"
                                }`}
                            >
                              {resume.file_type === "raw" ? (
                                <FaFilePdf size={10} />
                              ) : (
                                <FaImage size={10} />
                              )}
                              {resume.file_type === "raw"
                                ? "PDF Document"
                                : "Image Format"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() =>
                                statusUpdate(resume._id, resume.status)
                              }
                              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all transform active:scale-95 cursor-pointer ${resume.status
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
                                : "bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20"
                                }`}
                            >
                              {resume.status ? "ACTIVE" : "INACTIVE"}
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-3">
                              <Link
                                to={`/AddResume/${resume._id}`}
                                className="p-2 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500 hover:text-white rounded-lg transition-all shadow-sm"
                                title="Edit Resume"
                              >
                                <FaEdit size={16} />
                              </Link>
                              <button
                                onClick={() => deleteResume(resume._id)}
                                className="p-2 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white rounded-lg transition-all shadow-sm"
                                title="Delete Resume"
                              >
                                <FaTrash size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-6 py-12 text-center text-slate-500 italic"
                        >
                          {searchTerm
                            ? "No resumes matching your search."
                            : "No resumes found. Start by uploading one!"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
