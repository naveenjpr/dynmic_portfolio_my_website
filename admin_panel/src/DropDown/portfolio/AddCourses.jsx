import React, { useEffect } from "react";
import Header from "../../Common/Header";
import Sidebar from "../../Middle-Section/Sidebar";
import {
  FaPlusCircle,
  FaUpload,
  FaGithub,
  FaExternalLinkAlt,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function AddCourses() {
  let params = useParams();
  let paramsid = params.id;
  console.log(paramsid);
  const [formsubmit, setFormSubmit] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [technologies, setTechnologies] = useState([]);
  const [currentTech, setCurrentTech] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    githubFrontend: "",
    githubBackend: "",
    link: "",
    status: false,
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size should be less than 10MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTech = () => {
    if (currentTech.trim() && !technologies.includes(currentTech.trim())) {
      setTechnologies([...technologies, currentTech.trim()]);
      setCurrentTech("");
    }
  };

  const handleRemoveTech = (techToRemove) => {
    setTechnologies(technologies.filter((tech) => tech !== techToRemove));
  };

  const handleReset = () => {
    setImagePreview(null);
    setTechnologies([]);
    setCurrentTech("");
    setFormSubmit(false);
  };

  const handleChange = (event) => {
    const newItems = { ...formData };
    newItems[event.target.name] = event.target.value;

    setFormData(newItems);
  };

  let addData = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    form.set("technologies", JSON.stringify(technologies));

    if (paramsid) {
      axios
        .put(
          `https://dynmic-portfolio-my-website.onrender.com/api/backend/portfolio/update/${paramsid}`,
          form,
        )
        .then((result) => {
          if (result.data.status) {
            setFormData({
              title: result.data.data.title,
              description: result.data.data.description,
              githubFrontend: result.data.data.githubFrontend,
              githubBackend: result.data.data.githubBackend,
              link: result.data.data.link,
              status: result.data.data.status,
            });

            if (typeof toast !== "undefined") {
              toast.success("Product updated successfully!");
            } else {
              alert("Product updated successfully!");
            }

            setTimeout(() => {
              navigate("/ViewCourses");
            }, 500);
          } else {
            if (typeof toast !== "undefined") {
              toast.error(result.data.message || "Failed to update product");
            } else {
              alert(result.data.message || "Failed to update product");
            }
          }
        })
        .catch((error) => {
          if (typeof toast !== "undefined") {
            toast.error("Something went wrong while updating product");
          } else {
            alert("Something went wrong while updating product");
          }
        });
    } else {
      axios
        .post(
          "https://dynmic-portfolio-my-website.onrender.com/api/backend/portfolio/add",
          form,
        )
        .then((result) => {
          if (result.data.status) {
            setFormSubmit(true);
            if (typeof toast !== "undefined") {
              toast.success("Project added successfully!");
            } else {
              alert("Project added successfully!");
            }
            setTimeout(() => {
              navigate("/Viewportfolio");
            }, 500);
          }
        })
        .catch(() => {
          if (typeof toast !== "undefined") {
            toast.error("Something went wrong");
          } else {
            alert("Something went wrong");
          }
        });
    }
  };

  useEffect(() => {
    if (paramsid) {
      axios
        .post(
          "https://dynmic-portfolio-my-website.onrender.com/api/backend/portfolio/detail/" +
            paramsid,
        )
        .then((result) => {
          if (result.data.status) {
            const d = result.data.data;

            setFormData({
              title: d.title || "",
              description: d.description || "",
              githubFrontend: d.github?.frontend || "",
              githubBackend: d.github?.backend || "",
              link: d.link || "",
              status: d.status || false,
            });

            setTechnologies(d.technologies || []);
            setImagePreview(d.image || null);
          }
        })
        .catch(() => {});
    }
  }, [paramsid]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200">
      <Header />
      <div className="flex">
        {/* Sidebar Container */}
        <div className="hidden md:block w-72 shrink-0 border-r border-slate-800">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-x-hidden">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
              <h1 className="text-4xl font-extrabold tracking-tight text-white mb-3">
                {paramsid ? "Edit Project" : "Add New Project"}
              </h1>
              <p className="text-slate-400 text-lg">
                {paramsid
                  ? "Refine your project details to keep your portfolio up to date."
                  : "Share your latest work with the world. Fill in the details below."}
              </p>
            </div>

            {/* Form Card */}
            <div className="relative group">
              {/* Decorative Background Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

              <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-6 md:p-10 rounded-2xl shadow-2xl">
                <form
                  onSubmit={addData}
                  onReset={handleReset}
                  className="space-y-8"
                >
                  {/* Image Upload Section */}
                  <div className="space-y-4">
                    <label className="text-sm font-semibold text-slate-300 tracking-wider uppercase">
                      Project Thumbnail
                    </label>
                    <div className="relative group/upload border-2 border-dashed border-slate-700 hover:border-indigo-500/50 rounded-2xl p-2 transition-all duration-300 bg-slate-950/50 overflow-hidden">
                      {imagePreview ? (
                        <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-2xl">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/upload:scale-105"
                          />
                          <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover/upload:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setImagePreview(null);
                              }}
                              className="p-4 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transform hover:scale-110 transition-all duration-200"
                            >
                              <FaTimes size={20} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="py-12 flex flex-col items-center justify-center cursor-pointer">
                          <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mb-4 border border-indigo-500/20 group-hover/upload:scale-110 transition-transform duration-300">
                            <FaUpload className="w-8 h-8 text-indigo-400" />
                          </div>
                          <p className="text-white font-medium text-lg">
                            Drop your image here
                          </p>
                          <p className="text-slate-500 text-sm mt-1">
                            PNG or JPG, max 10MB
                          </p>
                        </div>
                      )}
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Title and Status */}
                  <div className="grid md:grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-300 tracking-wider uppercase">
                        Project Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        onChange={handleChange}
                        value={formData.title}
                        required
                        className="w-full px-5 py-4 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-slate-600"
                        placeholder="e.g., E-commerce Dashboard"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-300 tracking-wider uppercase">
                      Detailed Description *
                    </label>
                    <textarea
                      rows="5"
                      name="description"
                      onChange={handleChange}
                      value={formData.description}
                      required
                      className="w-full px-5 py-4 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-slate-600 resize-none"
                      placeholder="Tell us about the project features, challenges, and solutions..."
                    />
                  </div>

                  {/* Technologies Selection */}
                  <div className="space-y-4">
                    <label className="text-sm font-semibold text-slate-300 tracking-wider uppercase">
                      Core Technologies
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={currentTech}
                        onChange={(e) => setCurrentTech(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" &&
                          (e.preventDefault(), handleAddTech())
                        }
                        className="flex-1 px-5 py-4 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600"
                        placeholder="Add technology (e.g., Next.js, FastAPI)"
                      />
                      <button
                        type="button"
                        onClick={handleAddTech}
                        className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/20 active:scale-95 flex items-center gap-2"
                      >
                        <FaPlusCircle /> Add
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2 min-h-[48px]">
                      {technologies.length > 0 ? (
                        technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="group flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-indigo-300 rounded-lg text-sm font-semibold transition-all animate-in zoom-in duration-300"
                          >
                            {tech}
                            <button
                              type="button"
                              onClick={() => handleRemoveTech(tech)}
                              className="text-slate-500 hover:text-red-400 p-0.5 rounded transition-colors"
                            >
                              <FaTimes size={12} />
                            </button>
                          </span>
                        ))
                      ) : (
                        <p className="text-slate-600 text-sm italic py-2">
                          No technologies added yet.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* External Links Section */}
                  <div className="grid md:grid-cols-2 gap-8 pt-4">
                    <div className="space-y-4">
                      <label className="text-sm font-semibold text-slate-300 tracking-wider uppercase flex items-center gap-2">
                        <FaGithub className="text-indigo-400" /> Frontend Repo
                      </label>
                      <input
                        type="url"
                        name="githubFrontend"
                        onChange={handleChange}
                        value={formData.githubFrontend}
                        className="w-full px-5 py-4 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600"
                        placeholder="https://github.com/user/project-ui"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-sm font-semibold text-slate-300 tracking-wider uppercase flex items-center gap-2">
                        <FaGithub className="text-indigo-400" /> Backend Repo
                      </label>
                      <input
                        type="url"
                        name="githubBackend"
                        onChange={handleChange}
                        value={formData.githubBackend}
                        className="w-full px-5 py-4 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600"
                        placeholder="https://github.com/user/project-api"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <label className="text-sm font-semibold text-slate-300 tracking-wider uppercase flex items-center gap-2">
                      <FaExternalLinkAlt className="text-indigo-400" /> Live
                      Demo URL
                    </label>
                    <input
                      type="url"
                      name="link"
                      onChange={handleChange}
                      value={formData.link}
                      className="w-full px-5 py-4 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600"
                      placeholder="https://your-project-live.com"
                    />
                  </div>

                  {/* Form Submission Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-10 border-t border-slate-800">
                    <button
                      type="submit"
                      className="flex-1 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-lg rounded-xl transition-all shadow-xl shadow-indigo-500/10 active:scale-[0.98] transform"
                    >
                      {paramsid ? "Save Changes" : "Create Project Showcase"}
                    </button>
                    <button
                      type="reset"
                      className="px-10 py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-lg rounded-xl transition-all border border-slate-700 active:scale-95"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
