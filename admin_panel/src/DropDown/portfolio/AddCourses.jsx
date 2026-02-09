import React, { useEffect } from "react"
import Header from "../../Common/Header"
import Sidebar from "../../Middle-Section/Sidebar"
import { FaPlusCircle, FaUpload, FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';
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
    setTechnologies(technologies.filter(tech => tech !== techToRemove));
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
        .put(`http://localhost:5000/api/backend/portfolio/update/${paramsid}`, form)
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

            if (typeof toast !== 'undefined') {
              toast.success("Product updated successfully!");
            } else {
              alert("Product updated successfully!");
            }

            setTimeout(() => {
              navigate("/ViewCourses");
            }, 500);
          } else {
            if (typeof toast !== 'undefined') {
              toast.error(result.data.message || "Failed to update product");
            } else {
              alert(result.data.message || "Failed to update product");
            }
          }
        })
        .catch((error) => {
          if (typeof toast !== 'undefined') {
            toast.error("Something went wrong while updating product");
          } else {
            alert("Something went wrong while updating product");
          }
        });
    }
    else {
      axios
        .post("http://localhost:5000/api/backend/portfolio/add", form)
        .then((result) => {
          if (result.data.status) {
            setFormSubmit(true);
            if (typeof toast !== 'undefined') {
              toast.success("Project added successfully!");
            } else {
              alert("Project added successfully!");
            }
            setTimeout(() => {
              navigate("/ViewCourses");
            }, 500);
          }
        })
        .catch(() => {
          if (typeof toast !== 'undefined') {
            toast.error("Something went wrong");
          } else {
            alert("Something went wrong");
          }
        });
    }
  };


  useEffect(() => {
    if (paramsid) {
      axios.post("http://localhost:5000/api/backend/portfolio/detail/" + paramsid).then((result) => {
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
      }).catch(() => { })
    }
  }, [paramsid]);



  return (
    <>
      <Header />
      <div className="w-full">
        <div className="flex w-full">
          <div>
            <Sidebar />
          </div>
          <div className="flex-1 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full mx-auto">
              <div className=" bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20 p-8">

                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white">
                    {paramsid ? "Edit Project" : "Add New Project"}
                  </h2>
                  <p className="text-purple-200 mt-2">
                    {paramsid ? "Update your project showcase details" : "Create a new showcase for your portfolio"}
                  </p>
                </div>

                <form onSubmit={addData} onReset={handleReset}>
                  <div className="space-y-6">

                    {/* Image Upload */}
                    <div className="group">
                      <label className="block text-sm font-medium text-purple-200 mb-2">
                        Project Image
                      </label>
                      <div className="relative border-2 border-dashed border-purple-400/50 rounded-2xl p-4 text-center hover:border-purple-400 transition-all bg-white/5 cursor-pointer min-h-[250px] flex flex-col items-center justify-center overflow-hidden">
                        {imagePreview ? (
                          <div className="relative w-full h-[250px] group/container">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-full object-cover rounded-xl"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/container:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setImagePreview(null);
                                }}
                                className="p-3 bg-red-500/80 hover:bg-red-500 text-white rounded-full backdrop-blur-sm transition-all transform hover:scale-110"
                              >
                                <FaTimes className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="py-8">
                            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                              <FaUpload className="w-8 h-8 text-purple-300" />
                            </div>
                            <p className="text-white font-medium">Click to upload image</p>
                            <p className="text-sm text-gray-400 mt-2">PNG, JPG up to 10MB</p>
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

                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium text-purple-200 mb-2">
                        Project Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        onChange={handleChange}
                        value={formData.title}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                        placeholder="Enter project title"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-purple-200 mb-2">
                        Description *
                      </label>
                      <textarea
                        rows="4"
                        name="description"
                        onChange={handleChange}
                        value={formData.description}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none transition-all"
                        placeholder="Describe your project..."
                      />
                    </div>

                    {/* Technologies */}
                    <div>
                      <label className="block text-sm font-medium text-purple-200 mb-2">
                        Technologies
                      </label>
                      <div className="flex gap-2 mb-4">
                        <input
                          type="text"
                          value={currentTech}
                          onChange={(e) => setCurrentTech(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTech())}
                          className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                          placeholder="e.g., React.js"
                        />
                        <button
                          type="button"
                          onClick={handleAddTech}
                          className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition-all shadow-lg hover:shadow-purple-500/25 active:scale-95"
                        >
                          Add
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2 min-h-[40px]">
                        {technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 text-purple-100 rounded-full text-sm font-medium animate-in fade-in zoom-in duration-200"
                          >
                            {tech}
                            <button
                              type="button"
                              onClick={() => handleRemoveTech(tech)}
                              className="hover:bg-purple-500/30 rounded-full p-0.5 transition-colors"
                            >
                              <FaTimes className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* GitHub Links */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-purple-200 mb-2 flex items-center gap-2">
                          <FaGithub className="w-4 h-4 text-purple-400" />
                          Frontend Repository
                        </label>
                        <input
                          type="url"
                          name="githubFrontend"
                          onChange={handleChange}
                          value={formData.githubFrontend}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                          placeholder="https://github.com/..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-purple-200 mb-2 flex items-center gap-2">
                          <FaGithub className="w-4 h-4 text-purple-400" />
                          Backend Repository
                        </label>
                        <input
                          type="url"
                          value={formData.githubBackend}
                          onChange={handleChange}
                          name="githubBackend"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                          placeholder="https://github.com/..."
                        />
                      </div>
                    </div>

                    {/* Live Link */}
                    <div>
                      <label className="block text-sm font-medium text-purple-200 mb-2 flex items-center gap-2">
                        <FaExternalLinkAlt className="w-4 h-4 text-purple-400" />
                        Live Project Link
                      </label>
                      <input
                        type="url"
                        name="link"
                        onChange={handleChange}
                        value={formData.link}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                        placeholder="https://your-project.vercel.app"
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 pt-6">
                      <button
                        type="submit"
                        className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all shadow-xl hover:shadow-purple-500/25 active:scale-[0.98]"
                      >
                        {paramsid ? "Update Project" : "Create Project"}
                      </button>
                      <button
                        type="reset"
                        className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 transition-all active:scale-[0.98]"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
