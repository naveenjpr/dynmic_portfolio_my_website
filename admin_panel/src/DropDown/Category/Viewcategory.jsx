import axios from "axios";
import Header from "../../Common/Header";
import Sidebar from "../../Middle-Section/Sidebar";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router";

export default function Viewcategory() {
  const [viewcategory, setviewcategory] = useState([]);
  let baseurl = import.meta.env.VITE_API_URL;

  const categoryView = () => {
    axios
      .post(
        `${baseurl}/api/backend/category/view`,
      )
      .then((res) => {
        if (res.data.status) {
          setviewcategory(res.data.data);
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
        `${baseurl}/api/backend/category/status-change/`,
        obj,
      )
      .then((res) => {
        if (res.data.status) {
          toast.success("status changed successfully");
          categoryView();
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
          `${baseurl}/api/backend/category/delete/${id}`,
        )
        .then((res) => {
          if (res.data.status) {
            toast.success("Category deleted successfully");
            categoryView();
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
    categoryView();
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
        <main className="flex-1 p-4 md:p-8">
          <div className="bg-slate-800 rounded-2xl shadow-lg p-5">
            {/* Title */}
            <div className="mb-5 flex justify-between items-center">
              <h2 className="text-xl md:text-2xl font-semibold">
                Category List
              </h2>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg text-sm">
                + Add Category
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                {/* Head */}
                <thead>
                  <tr className="bg-slate-700 text-gray-300 text-sm">
                    <th className="p-3 rounded-l-lg">No</th>
                    <th className="p-3">Skills Name</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 rounded-r-lg">Action</th>
                  </tr>
                </thead>

                {/* Body */}
                <tbody className="text-sm">
                  {viewcategory.length > 0 ? (
                    viewcategory.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-slate-700 hover:bg-slate-700 transition"
                      >
                        <td className="p-3">{index + 1}</td>

                        <td className="p-3">{item.Skills}</td>

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
                            to={`/Addcategory/${item._id}`}
                            className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-xs cursor-pointer"
                          >
                            <button className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-xs cursor-pointer">
                              Edit
                            </button>
                          </Link>

                          <button
                            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-xs cursor-pointer"
                            onClick={() => deleteitem(item._id)}
                          >
                            Delete
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
