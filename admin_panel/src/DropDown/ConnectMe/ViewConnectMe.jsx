import axios from "axios";
import Header from "../../Common/Header";
import Sidebar from "../../Middle-Section/Sidebar";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router";
import { FaEdit, FaTrash, FaPlus, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaToggleOn, FaToggleOff, FaAddressCard } from "react-icons/fa";

export default function ViewConnectMe() {
  const [viewConnectMe, setviewConnectMe] = useState([]);
  let baseurl = import.meta.env.VITE_API_URL;

  const ConnectMeView = () => {
    axios
      .post(
        `${baseurl}/api/backend/ConnectMe/view`,
      )
      .then((res) => {
        if (res.data.status) {
          setviewConnectMe(res.data.data);
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
        `${baseurl}/api/backend/ConnectMe/status-change/`,
        obj,
      )
      .then((res) => {
        if (res.data.status) {
          toast.success("status changed successfully");
          ConnectMeView();
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
          `${baseurl}/api/backend/ConnectMe/delete/${id}`,
        )
        .then((res) => {
          if (res.data.status) {
            toast.success("ConnectMe deleted successfully");
            ConnectMeView();
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
    ConnectMeView();
  }, []);

  return (
    <div className="min-h-screen bg-[#020202] text-slate-200">
      <Header />

      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:block w-72 shrink-0 border-r border-slate-800/50">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 lg:p-12">
          <div className="bg-slate-900/50 backdrop-blur-sm rounded-3xl border border-slate-700/50 shadow-2xl overflow-hidden">
            {/* Header Section */}
            <div className="p-6 md:p-8 border-b border-slate-800/50 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent flex items-center gap-3">
                  <FaAddressCard className="text-indigo-400 text-2xl md:text-3xl" />
                  Contact List
                </h2>
                <p className="text-slate-400 text-sm mt-1">View and manage your professional contact information</p>
              </div>
              <Link
                to="/AddConnectMe"
                className="group flex items-center gap-2 bg-linear-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
              >
                <FaPlus className="group-hover:rotate-90 transition-transform transition-all" />
                Add New Contact
              </Link>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="p-5 font-semibold">No.</th>
                    <th className="p-5 font-semibold">Address Details</th>
                    <th className="p-5 font-semibold">Contact Email</th>
                    <th className="p-5 font-semibold">Phone Number</th>
                    <th className="p-5 font-semibold">Status</th>
                    <th className="p-5 font-semibold text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800/50">
                  {viewConnectMe.length > 0 ? (
                    viewConnectMe.map((item, index) => (
                      <tr
                        key={item._id || index}
                        className="group hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="p-5">
                          <span className="text-slate-500 font-mono text-xs">{(index + 1).toString().padStart(2, '0')}</span>
                        </td>

                        <td className="p-5 max-w-xs">
                          <div className="flex items-start gap-2">
                            <FaMapMarkerAlt className="text-indigo-400 mt-1 shrink-0" />
                            <span className="text-sm text-slate-300 leading-relaxed truncate group-hover:whitespace-normal transition-all">{item.Address}</span>
                          </div>
                        </td>

                        <td className="p-5">
                          <div className="flex items-center gap-2">
                            <FaEnvelope className="text-indigo-400 shrink-0" />
                            <span className="text-sm text-slate-300">{item.Email}</span>
                          </div>
                        </td>

                        <td className="p-5 font-mono">
                          <div className="flex items-center gap-2">
                            <FaPhoneAlt className="text-indigo-400 shrink-0" />
                            <span className="text-sm text-slate-300">{item.Phone}</span>
                          </div>
                        </td>

                        <td className="p-5">
                          <button
                            onClick={() => toggleStatus(item._id, item.status)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                              item.status
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                            }`}
                          >
                            {item.status ? (
                              <><FaToggleOn className="text-sm" /> Active</>
                            ) : (
                              <><FaToggleOff className="text-sm" /> Inactive</>
                            )}
                          </button>
                        </td>

                        <td className="p-5">
                          <div className="flex justify-end gap-3">
                            <Link
                              to={`/AddConnectMe/${item._id}`}
                              className="p-2.5 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white rounded-lg transition-all shadow-lg shadow-blue-500/0 hover:shadow-blue-500/20"
                              title="Edit Contact"
                            >
                              <FaEdit className="text-sm" />
                            </Link>

                            <button
                              onClick={() => deleteitem(item._id)}
                              className="p-2.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white rounded-lg transition-all shadow-lg shadow-rose-500/0 hover:shadow-rose-500/20 cursor-pointer"
                              title="Delete Contact"
                            >
                              <FaTrash className="text-sm" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="p-20 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center">
                            <FaAddressCard className="text-slate-600 text-2xl" />
                          </div>
                          <p className="text-slate-500 text-sm">No contact information found. Start by adding one!</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer Section */}
            <div className="p-5 bg-slate-800/30 border-t border-slate-800/50 flex justify-between items-center">
              <p className="text-xs text-slate-500 italic">
                * Active contacts will be visible on your public portfolio website.
              </p>
              <span className="text-xs text-slate-400 font-mono">
                Total Records: {viewConnectMe.length}
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
