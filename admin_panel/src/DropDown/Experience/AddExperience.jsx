import axios from "axios";
import Header from "../../Common/Header";
import Sidebar from "../../Middle-Section/Sidebar";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

export default function AddExperience() {
  let baseurl = import.meta.env.VITE_API_URL;

  let navigate = useNavigate();
  let params = useParams();
  let paramsId = params.id;

  const [formData, setFormData] = useState({
    companyName: "",
    companyLogo: null,
    employmentType: "Full-time",
    location: "",
    startDate: "",
    endDate: "",
    duration: "",
    description: "",
    technologies: "",
    status: true,
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, companyLogo: file });
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (paramsId) {
      axios
        .post(`${baseurl}/api/backend/Experience/detail/${paramsId}`)
        .then((res) => {
          if (res.data.status) {
            const data = res.data.data;
            setFormData({
              ...data,
              startDate: data.startDate ? data.startDate.split("T")[0] : "",
              endDate: data.endDate ? data.endDate.split("T")[0] : "",
              description: Array.isArray(data.description) ? data.description.join(", ") : (data.description || ""),
              technologies: Array.isArray(data.technologies) ? data.technologies.join(", ") : (data.technologies || ""),
            });
            setPreviewImage(data.companyLogo);
          }
        });
    } else {
      setFormData({
        companyName: "",
        companyLogo: null,
        employmentType: "Full-time",
        location: "",
        startDate: "",
        endDate: "",
        duration: "",
        description: "",
        technologies: "",
        status: true,
      });
      setPreviewImage(null);
    }
  }, [paramsId, baseurl]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("companyName", formData.companyName);
    if (formData.companyLogo instanceof File) {
      data.append("companyLogo", formData.companyLogo);
    }
    data.append("employmentType", formData.employmentType);
    data.append("location", formData.location);
    data.append("startDate", formData.startDate);
    data.append("endDate", formData.endDate);
    data.append("duration", formData.duration);

    // Array conversion
    const descriptionArray = formData.description ? formData.description.split(",").map(item => item.trim()) : [];
    const technologiesArray = formData.technologies ? formData.technologies.split(",").map(item => item.trim()) : [];

    data.append("description", JSON.stringify(descriptionArray));
    data.append("technologies", JSON.stringify(technologiesArray));
    data.append("status", formData.status);

    const apiUrl = paramsId
      ? `${baseurl}/api/backend/Experience/update/${paramsId}`
      : `${baseurl}/api/backend/Experience/add`;

    const method = paramsId ? "put" : "post";

    axios[method](apiUrl, data, {
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then((res) => {
        if (res.data.status) {
          toast.success(paramsId ? "Experience updated!" : "Experience added!");
          setTimeout(() => navigate("/ViewExperience"), 2000);
        } else {
          toast.error(res.data.message || "Something went wrong");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error processing request");
      });
  };

  return (
    <div className="min-h-screen bg-[#020202] text-slate-200">
      <Header />

      <div className="flex">
        <div className="hidden md:block w-72 shrink-0 border-r border-slate-800">
          <Sidebar />
        </div>

        <main className="flex-1 p-4 md:p-8 lg:p-12">
          <div className="max-w-4xl mx-auto bg-slate-800 rounded-2xl shadow-lg p-6 md:p-8 border border-slate-700">
            <h2 className="text-xl md:text-2xl font-bold mb-8 text-yellow-500 flex items-center gap-2">
              <span className="bg-yellow-500 w-2 h-8 rounded-full"></span>
              {paramsId ? "Edit Experience" : "Add Experience"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company Name */}
                <div>
                  <label className="block mb-2 text-sm font-medium">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="e.g. Google"
                    className="w-full p-3 rounded-xl bg-slate-700 border border-slate-600 focus:ring-2 focus:ring-yellow-500 outline-none"
                    required
                  />
                </div>

                {/* Employment Type */}
                <div>
                  <label className="block mb-2 text-sm font-medium">Employment Type</label>
                  <select
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl bg-slate-700 border border-slate-600 outline-none"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block mb-2 text-sm font-medium">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Remote, Mumbai, etc."
                    className="w-full p-3 rounded-xl bg-slate-700 border border-slate-600 outline-none"
                  />
                </div>

                {/* Duration */}
                <div>
                  <label className="block mb-2 text-sm font-medium">Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g. 6 Months, 1 Year"
                    className="w-full p-3 rounded-xl bg-slate-700 border border-slate-600 outline-none"
                  />
                </div>

                {/* Dates */}
                <div>
                  <label className="block mb-2 text-sm font-medium">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl bg-slate-700 border border-slate-600 outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl bg-slate-700 border border-slate-600 outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block mb-2 text-sm font-medium">Description (Comma separated bullets)</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Built UI, Managed team, Integrated APIs..."
                  className="w-full p-3 rounded-xl bg-slate-700 border border-slate-600 outline-none"
                ></textarea>
              </div>

              {/* Technologies */}
              <div>
                <label className="block mb-2 text-sm font-medium">Technologies (Comma separated)</label>
                <input
                  type="text"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleChange}
                  placeholder="React, Node.js, AWS..."
                  className="w-full p-3 rounded-xl bg-slate-700 border border-slate-600 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                {/* Logo Upload */}
                <div>
                  <label className="block mb-2 text-sm font-medium">Company Logo</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-black hover:file:bg-yellow-600"
                  />
                  {previewImage && (
                    <img src={previewImage} alt="Preview" className="mt-4 h-16 w-16 object-contain bg-white rounded-lg p-1" />
                  )}
                </div>

                {/* Status */}
                <div>
                  <label className="block mb-2 text-sm font-medium">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value === "true" })}
                    className="w-full p-3 rounded-xl bg-slate-700 border border-slate-600 outline-none"
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 active:scale-95 transition text-black px-8 py-3 rounded-xl font-bold flex-1"
                >
                  {paramsId ? "Update Experience" : "Save Experience"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/ViewExperience")}
                  className="bg-slate-600 hover:bg-slate-700 px-8 py-3 rounded-xl font-medium transition"
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
