import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router';
import Header from "../../Common/Header";
import Sidebar from "../../Middle-Section/Sidebar";
import { toast } from 'react-toastify';
export default function AddAchievements() {

    let baseurl = import.meta.env.VITE_API_URL;
    const [preImagePath, setPreImagePath] = useState('');


    let navigate = useNavigate();
    let params = useParams();
    let paramsId = params.id;
    const [formData, setFormData] = useState({
        Description: "",
        image: "",
        status: true, // ✅ boolean
    });
    let imagePreview = (event) => {
        const file = event.target.files[0];

        if (file) {
            let currentUrl = URL.createObjectURL(file);
            setPreImagePath(currentUrl);

            // formData me bhi set karo (optional but good)
            setFormData({ ...formData, image: file });
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        if (paramsId) {
            axios
                .post(
                    `${baseurl}/api/backend/Achievements/detail/${paramsId}`,
                )
                .then((res) => {
                    const { Description, image, status } = res.data.data;
                    setFormData({
                        Description: Description,
                        image: image,
                        status: status
                    });
                    if (image) {
                        setPreImagePath(image);
                    }
                });
        } else {
            // Reset form when entering Add mode
            setFormData({
                Description: "",
                image: "",
                status: true,
            });
            setPreImagePath('');
        }
    }, [paramsId, baseurl]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        let obj = new FormData(e.target)
        if (paramsId) {
            axios
                .put(
                    `${baseurl}/api/backend/Achievements/update/${paramsId}`,
                    obj,
                )
                .then((res) => {
                    console.log(res.data);
                    toast.success("Achievements updated successfully!");
                    setTimeout(() => {
                        navigate("/ViewAchievements");
                    }, 2000);
                })
                .catch((err) => {
                    console.error("Error updating Achievements:", err);
                    toast.error("Error updating Achievements.");
                });
        } else {
            axios
                .post(
                    `${baseurl}/api/backend/Achievements/add`,
                    obj,
                )
                .then((res) => {
                    console.log(res.data);
                    if (res.data.status) {
                        toast.success("Achievements added successfully!");

                        setTimeout(() => {
                            navigate("/ViewAchievements");
                        }, 2000);
                    } else {
                        toast.error("Failed to add Achievements.");
                    }
                })
                .catch((err) => {
                    console.error("Error adding Achievements:", err);
                    toast.error("Error adding Achievements.");
                });
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
                    <div className="max-w-2xl mx-auto bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl p-6 md:p-10">
                        {/* Title */}
                        <Link to="/AddAchievements" className="inline-block group">
                            <h2 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-white to-slate-400 bg-clip-text text-transparent mb-8">
                                {paramsId ? "Edit Achievement" : "Add New Achievement"}
                            </h2>
                        </Link>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Description */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-slate-300">Description</label>
                                <input
                                    type="text"
                                    name="Description"
                                    value={formData.Description}
                                    onChange={handleChange}
                                    placeholder="Enter achievement description..."
                                    rows="3"
                                    className="w-full p-4 rounded-xl bg-slate-900/50 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all placeholder:text-slate-600 resize-none"
                                    required
                                />
                            </div>

                            {/* Image Upload Area */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-slate-300">Achievement Image</label>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-center w-full">
                                        <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-slate-600 rounded-2xl cursor-pointer bg-slate-900/30 hover:bg-slate-800/50 hover:border-yellow-500/50 transition-all group">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg className="w-10 h-2 mb-3 text-slate-500 group-hover:text-yellow-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <p className="mb-2 text-sm text-slate-400"><span className="font-semibold text-yellow-500">Click to upload</span> or drag and drop</p>
                                                <p className="text-xs text-slate-500 uppercase tracking-wider">PNG, JPG, SVG or WEBP</p>
                                            </div>
                                            <input
                                                type="file"
                                                name="image"
                                                className="hidden"
                                                onChange={imagePreview}
                                                accept="image/*"
                                            />
                                        </label>
                                    </div>

                                    {/* Preview Case */}
                                    {preImagePath && (
                                        <div className="relative inline-block mt-2 group/preview">
                                            <div className="relative overflow-hidden rounded-xl border-4 border-slate-700 shadow-2xl">
                                                <img
                                                    src={preImagePath}
                                                    alt="Preview"
                                                    className="w-48 h-48 object-cover transition-transform duration-500 group-hover/preview:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center">
                                                    <p className="text-white text-xs font-bold uppercase tracking-widest">Selected Image</p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setPreImagePath('');
                                                    const fileInput = document.querySelector('input[name="image"]');
                                                    if (fileInput) fileInput.value = '';
                                                }}
                                                className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-2 shadow-xl hover:bg-red-600 transition-colors transform hover:scale-110 active:scale-95"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-slate-300">Visibility Status</label>
                                <div className="relative">
                                    <select
                                        name="status"
                                        value={String(formData.status)}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                status: e.target.value == "true",
                                            })
                                        }
                                        className="w-full p-4 rounded-xl bg-slate-900/50 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 appearance-none cursor-pointer text-slate-200"
                                    >
                                        <option value="true" className="bg-slate-800">Active (Public)</option>
                                        <option value="false" className="bg-slate-800">Inactive (Hidden)</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                <button
                                    type="submit"
                                    className="flex-1 bg-linear-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider transition-all shadow-lg shadow-yellow-500/20 active:scale-95"
                                >
                                    {paramsId ? "Update Achievement" : "Create Achievement"}
                                </button>

                                <button
                                    type="reset"
                                    className="sm:w-32 bg-slate-700/50 hover:bg-slate-700 text-slate-300 border border-slate-600 px-6 py-4 rounded-xl text-sm font-medium transition-all"
                                    onClick={() => {
                                        setFormData({ Description: "", image: "", status: true });
                                        setPreImagePath('');
                                        const fileInput = document.querySelector('input[name="image"]');
                                        if (fileInput) fileInput.value = '';
                                    }}
                                >
                                    Reset
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}
