import axios from "axios";
import Header from "../../Common/Header";
import Sidebar from "../../Middle-Section/Sidebar";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

export default function AddSocial() {
  let baseurl = import.meta.env.VITE_API_URL;

  let navigate = useNavigate();
  let params = useParams();
  let paramsId = params.id;

  const [formData, setFormData] = useState({
    platform: "",
    url: "",
    status: true,
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (paramsId) {
      axios
        .post(`${baseurl}/api/backend/Social/detail/${paramsId}`)
        .then((res) => {
          if (res.data.status) {
            const { platform, url, status, social_icon } = res.data.data;
            setFormData({ platform, url, status });
            setImagePreview(social_icon);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [paramsId, baseurl]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("platform", formData.platform);
    data.append("url", formData.url);
    data.append("status", formData.status);
    if (image) {
      data.append("social_icon", image);
    }

    if (paramsId) {
      axios
        .put(`${baseurl}/api/backend/Social/update/${paramsId}`, data)
        .then((res) => {
          if (res.data.status) {
            toast.success("Social record updated successfully!");
            setTimeout(() => navigate("/ViewSocial"), 1500);
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => toast.error("Error updating record."));
    } else {
      if (!image) {
        return toast.warning("Please select a social icon.");
      }
      axios
        .post(`${baseurl}/api/backend/Social/add`, data)
        .then((res) => {
          if (res.data.status) {
            toast.success("Social record added successfully!");
            setTimeout(() => navigate("/ViewSocial"), 1500);
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => toast.error("Error adding record."));
    }
  };

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
          <div className="max-w-2xl mx-auto bg-slate-800 rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-8 text-center text-yellow-500">
              {paramsId ? "Update" : "Add"} Socially Engaged
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Platform Name */}
              <div>
                <label className="block mb-2 text-sm text-slate-400">Platform Name</label>
                <input
                  type="text"
                  name="platform"
                  value={formData.platform}
                  onChange={handleChange}
                  placeholder="e.g. WhatsApp, LinkedIn"
                  className="w-full p-3 rounded-xl bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all text-sm"
                  required
                />
              </div>

              {/* URL */}
              <div>
                <label className="block mb-2 text-sm text-slate-400">URL</label>
                <input
                  type="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full p-3 rounded-xl bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all text-sm"
                  required
                />
              </div>

              {/* Icon Upload */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <div>
                  <label className="block mb-2 text-sm text-slate-400">Social Icon</label>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-yellow-500/10 file:text-yellow-500 hover:file:bg-yellow-500/20 transition-all"
                    accept="image/*"
                  />
                </div>
                {imagePreview && (
                  <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-xl border border-slate-700">
                    <img src={imagePreview} alt="Preview" className="w-12 h-12 rounded object-contain bg-slate-800" />
                    <span className="text-xs text-slate-500 truncate">Current / Preview</span>
                  </div>
                )}
              </div>

              {/* Status */}
              <div>
                <label className="block mb-2 text-sm text-slate-400">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value === "true" })}
                  className="w-full p-3 rounded-xl bg-slate-700 border border-slate-600 focus:outline-none text-sm"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black py-3 rounded-xl text-sm font-bold transition-transform active:scale-[0.98] shadow-lg shadow-yellow-500/10"
                >
                  {paramsId ? "Update Record" : "Save Record"}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/ViewSocial")}
                  className="px-8 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
