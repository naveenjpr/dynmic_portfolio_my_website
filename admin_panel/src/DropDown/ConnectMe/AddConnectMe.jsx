import axios from "axios";
import Header from "../../Common/Header";
import Sidebar from "../../Middle-Section/Sidebar";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaCheckCircle, FaSave, FaUndo, FaAddressCard } from "react-icons/fa";

export default function AddConnectMe() {
  let baseurl = import.meta.env.VITE_API_URL;

  let navigate = useNavigate();
  let params = useParams();
  let paramsId = params.id;
  console.log("paramsId:", paramsId);
  const [formData, setFormData] = useState({
    Address: "",
    Email: "",
    Phone: "",
    status: true, // ✅ boolean
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (paramsId) {
      axios
        .post(
          `${baseurl}/api/backend/ConnectMe/detail/${paramsId}`,
        )
        .then((res) => {
          const { Address, Email, Phone, status } = res.data.data;
          setFormData({ Address: Address, Email: Email, Phone: Phone, status: status.toString() });
        });
    }
  }, [paramsId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    let obj = {
      Address: e.target.Address.value,
      Email: e.target.Email.value,
      Phone: e.target.Phone.value,
      status: e.target.status.value,
    };
    if (paramsId) {
      axios
        .put(
          `${baseurl}/api/backend/ConnectMe/update/${paramsId}`,
          obj,
        )
        .then((res) => {
          console.log(res.data);
          toast.success("ConnectMe updated successfully!");
          setTimeout(() => {
            navigate("/ViewConnectMe");
          }, 2000);
        })
        .catch((err) => {
          console.error("Error updating ConnectMe:", err);
          toast.error("Error updating ConnectMe.");
        });
    } else {
      axios
        .post(
          `${baseurl}/api/backend/ConnectMe/add`,
          obj,
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.status) {
            toast.success("ConnectMe added successfully!");

            setTimeout(() => {
              navigate("/ViewConnectMe");
            }, 2000);
          } else {
            toast.error("Failed to add ConnectMe.");
          }
        })
        .catch((err) => {
          console.error("Error adding ConnectMe:", err);
          toast.error("Error adding ConnectMe.");
        });
    }
  };

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
          <div className="max-w-3xl mx-auto bg-slate-900/50 backdrop-blur-sm rounded-3xl border border-slate-700/50 shadow-2xl p-6 md:p-10">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                  {paramsId ? "Edit Contact Details" : "Add Contact Details"}
                </h2>
                <p className="text-slate-400 text-sm mt-1">Manage your professional contact information</p>
              </div>
              <div className="hidden sm:block p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                <FaAddressCard className="text-2xl text-indigo-400" />
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Address */}
              <div className="md:col-span-2">
                <label className="mb-2 text-sm font-medium text-slate-300 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-indigo-400" /> Address
                </label>
                <input
                  type="text"
                  name="Address"
                  value={formData.Address}
                  onChange={handleChange}
                  placeholder="Street address, city, state, country"
                  className="w-full p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <FaEnvelope className="text-indigo-400" /> Email Address
                </label>
                <input
                  type="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <FaPhoneAlt className="text-indigo-400" /> Phone Number
                </label>
                <input
                  type="text"
                  name="Phone"
                  value={formData.Phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                  required
                />
              </div>

              {/* Status */}
              <div className="md:col-span-2">
                <label className="mb-2 text-sm font-medium text-slate-300 flex items-center gap-2">
                  <FaCheckCircle className="text-indigo-400" /> Visibility Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value === "true",
                    })
                  }
                  className="w-full p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-indigo-500/50 transition-all outline-none appearance-none cursor-pointer"
                >
                  <option value="true">Active (Visible)</option>
                  <option value="false">Inactive (Hidden)</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 pt-6 mt-6 border-t border-slate-800/50">
                <button
                  type="submit"
                  className="flex-1 flex justify-center items-center gap-2 bg-linear-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white px-8 py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all"
                >
                  <FaSave /> {paramsId ? "Update Information" : "Save Information"}
                </button>

                <button
                  type="reset"
                  className="flex justify-center items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-8 py-3.5 rounded-xl text-sm font-semibold transition-all border border-slate-700"
                  onClick={() => setFormData({ Address: "", Email: "", Phone: "", status: true })}
                >
                  <FaUndo className="text-xs" /> Reset Form
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
