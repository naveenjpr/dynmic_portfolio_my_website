import axios from 'axios';
import Header from '../../Common/Header'
import Sidebar from '../../Middle-Section/Sidebar'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Link } from 'react-router';

export default function ViewSocial() {
  let baseurl = import.meta.env.VITE_API_URL;

  const [viewSocial, setViewSocial] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSocial = viewSocial.filter((item) =>
    item.platform.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const socialView = () => {
    axios
      .post(
        `${baseurl}/api/backend/Social/view`,
      )
      .then((res) => {
        if (res.data.status) {
          setViewSocial(res.data.data);
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
        `${baseurl}/api/backend/Social/status-change/`,
        obj,
      )
      .then((res) => {
        if (res.data.status) {
          toast.success("Status changed successfully");
          socialView();
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong");
      });
  };

  let deleteItem = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios
        .delete(
          `${baseurl}/api/backend/Social/delete/${id}`,
        )
        .then((res) => {
          if (res.data.status) {
            toast.success("Record deleted successfully");
            socialView();
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error("Something went wrong");
        });
    }
  };

  useEffect(() => {
    socialView();
  }, []);

  return (
    <div className="min-h-screen bg-[#020202] text-slate-200">
      <Header />

      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:block w-72 shrink-0 border-r border-slate-800">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 lg:p-12">
          <div className="bg-slate-800 rounded-2xl shadow-lg overflow-hidden">

            {/* Header */}
            <div className="p-6 border-b border-slate-700 flex flex-col md:flex-row gap-4 justify-between items-center">
              <h2 className="text-xl font-semibold">Socially Engaged List</h2>

              <div className="flex flex-1 max-w-md w-full gap-2">
                <input
                  type="text"
                  placeholder="Search platform..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:border-yellow-500 text-sm"
                />
              </div>

              <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg text-sm font-medium whitespace-nowrap">
                <Link to="/AddSocial">
                  + Add Social
                </Link>
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-700 text-gray-300 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-4">No</th>
                    <th className="px-6 py-4">Platform</th>
                    <th className="px-6 py-4">URL</th>
                    <th className="px-6 py-4">Icon</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-center">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-700">
                  {filteredSocial.length > 0 ? (
                    filteredSocial.map((v, i) => (
                      <tr className="hover:bg-slate-700/50 transition cursor-default" key={v._id}>
                        <td className="px-6 py-4">{i + 1}</td>
                        <td className="px-6 py-4 font-medium capitalize">{v.platform}</td>
                        <td className="px-6 py-4 max-w-xs truncate">
                          <a href={v.url} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">
                            {v.url}
                          </a>
                        </td>
                        <td className="px-6 py-4">
                          <div className="w-10 h-10 rounded-lg bg-slate-700 p-1 flex items-center justify-center">
                            <img
                              src={v.social_icon}
                              alt={v.platform}
                              className="max-w-full max-h-full rounded shadow-sm object-contain"
                            />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => toggleStatus(v._id, v.status)}
                            className={`cursor-pointer px-3 py-1 rounded-full text-xs font-medium transition-colors ${v.status
                                ? "bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20"
                                : "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
                              }`}
                          >
                            {v.status ? "Active" : "Inactive"}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-center space-x-3">
                          <button className="cursor-pointer bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 px-3 py-1.5 rounded-lg text-xs font-medium border border-blue-500/20 transition-all">
                            <Link to={`/AddSocial/${v._id}`}>
                              Edit
                            </Link>
                          </button>
                          <button
                            onClick={() => deleteItem(v._id)}
                            className="cursor-pointer bg-red-500/10 text-red-400 hover:bg-red-500/20 px-3 py-1.5 rounded-lg text-xs font-medium border border-red-500/20 transition-all"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-slate-400">
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-2xl">🔍</span>
                          <p>No social records found</p>
                        </div>
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
  )
}
