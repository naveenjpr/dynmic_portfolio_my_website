import React, { useEffect, useState } from "react";
import Header from "../../Common/Header";
import Sidebar from "../../Middle-Section/Sidebar";
import { FaUpload, FaTimes, FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

export default function AddResume() {
    const [imagePreview, setImagePreview] = useState(null);
    const [formsubmit, setFormSubmit] = useState(false);
    const [formData, setFormData] = useState({

        status: ""
    });
    const navigate = useNavigate();

    const [status, setStatus] = useState(true);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            if (file.size > 10 * 1024 * 1024) { // 10MB 
                alert("File size should be less than 10MB");
                return;
            }

            if (file.type === "application/pdf") {
                setImagePreview("pdf"); // special flag
            } else {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result);
                };
                reader.readAsDataURL(file);
            }
        }
    };
    const handleChange = (event) => {
        const newItems = { ...formData };
        newItems[event.target.name] = event.target.value;

        setFormData(newItems);
    };

    const handleReset = () => {
        setImagePreview(null);
        setStatus(true);
    };
    let params = useParams();
    let paramId = params.id;
    useEffect(() => {
        if (paramId) {
            axios.post(`https://dynmic-portfolio-my-website.onrender.com/api/backend/Resume/detail/${paramId}`)
                .then((result) => {
                    const data = result.data.data;

                    if (data.file_type === "raw") {
                        setImagePreview("pdf");
                    } else {
                        setImagePreview(data.image);
                    }

                    setStatus(data.status);
                });

        }
    }, [paramId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        form.set("status", status); // add status to formData


        if (paramId) {
            axios
                .put(
                    `https://dynmic-portfolio-my-website.onrender.com/api/backend/Resume/update/${paramId}`,
                    form
                )
                .then((result) => {
                    if (result.data.status) {
                        alert("Resume updated successfully!");

                        setTimeout(() => {
                            navigate("/ViewResume");
                        }, 500);
                    }
                })
                .catch(() => {
                    alert("Update failed");
                });
        }

        else {
            axios
                .post(
                    "https://dynmic-portfolio-my-website.onrender.com/api/backend/Resume/add",
                    form,
                )
                .then((result) => {
                    if (result.data.status) {
                        setFormSubmit(true);
                        if (typeof toast !== "undefined") {
                            toast.success("Resume added successfully!");
                        } else {
                            alert("Resume added successfully!");
                        }
                        setTimeout(() => {
                            navigate("/ViewResume");
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

    }, []);

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200">
            <Header />
            <div className="flex">
                {/* Sidebar */}
                <div className="hidden md:block w-72 shrink-0 border-r border-slate-800">
                    <Sidebar />
                </div>

                {/* Main Content */}
                <main className="flex-1 p-4 md:p-8 lg:p-12">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
                            <h1 className="text-4xl font-extrabold tracking-tight text-white mb-3">
                                Upload Resume
                            </h1>
                            <p className="text-slate-400 text-lg">
                                Share your latest resume with the world. Fill in the details below.
                            </p>
                        </div>

                        {/* Form Card */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-linear-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>

                            <div className="relative bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-6 md:p-10 rounded-2xl shadow-2xl">
                                <form onSubmit={handleSubmit} onReset={handleReset} className="space-y-8">

                                    {/* File Upload Section */}
                                    <div className="space-y-4">
                                        <label className="text-sm font-semibold text-slate-300 tracking-wider uppercase">
                                            Resume File (PDF or Image)
                                        </label>
                                        <div className="relative group/upload border-2 border-dashed border-slate-700 hover:border-indigo-500/50 rounded-2xl p-2 transition-all duration-300 bg-slate-950/50 overflow-hidden">
                                            {imagePreview ? (
                                                <div className="relative aspect-auto min-h-[200px] w-full rounded-xl overflow-hidden shadow-2xl flex items-center justify-center bg-slate-800">
                                                    {imagePreview === "pdf"
                                                        ? (
                                                            <div className="flex flex-col items-center p-8 text-indigo-400">
                                                                <FaCloudUploadAlt className="w-16 h-16 mb-2" />
                                                                <p className="font-semibold text-center">PDF Resume Selected</p>
                                                            </div>
                                                        ) : (
                                                            <img
                                                                src={imagePreview}
                                                                alt="Resume Preview"
                                                                className="max-h-[400px] w-auto object-contain transition-transform duration-500 group-hover/upload:scale-105"
                                                            />
                                                        )}
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
                                                <div className="py-16 flex flex-col items-center justify-center cursor-pointer">
                                                    <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mb-4 border border-indigo-500/20 group-hover/upload:scale-110 transition-transform duration-300">
                                                        <FaUpload className="w-8 h-8 text-indigo-400" />
                                                    </div>
                                                    <p className="text-white font-medium text-lg">Click or drop file here</p>
                                                    <p className="text-slate-500 text-sm mt-1">PDF or Image (JPG, PNG), max 10MB</p>
                                                </div>
                                            )}
                                            <input
                                                type="file"
                                                name="image"
                                                accept=".pdf,image/*"
                                                onChange={handleImageChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Status Toggle */}
                                    <div className="flex items-center space-x-4">
                                        <label className="text-sm font-semibold text-slate-300 tracking-wider uppercase">
                                            Status:
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => setStatus(!status)}
                                            value={formsubmit.status}
                                            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${status ? "bg-indigo-600" : "bg-slate-700"
                                                }`}
                                        >
                                            <span
                                                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${status ? "translate-x-6" : "translate-x-1"
                                                    }`}
                                            />
                                        </button>
                                        <span className={`text-sm font-medium ${status ? "text-indigo-400" : "text-slate-400"}`}>
                                            {status ? "Active" : "Inactive"}
                                        </span>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-4 pt-10 border-t border-slate-800">
                                        <button
                                            type="submit"
                                            className="flex-1 py-4 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-lg rounded-xl transition-all shadow-xl shadow-indigo-500/10 active:scale-[0.98] transform flex items-center justify-center gap-2"
                                        >
                                            Upload Resume
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

