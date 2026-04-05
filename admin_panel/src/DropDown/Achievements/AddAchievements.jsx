import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router';
import Header from "../../Common/Header";
import Sidebar from "../../Middle-Section/Sidebar";
import { toast } from 'react-toastify';
export default function AddAchievements() {

    let baseurl = import.meta.env.VITE_API_URL;

    let navigate = useNavigate();
    let params = useParams();
    let paramsId = params.id;
    console.log("paramsId:", paramsId);
    const [formData, setFormData] = useState({
        Description: "",
        image: "",
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
                    `${baseurl}/api/backend/Achievements/detail/${paramsId}`,
                )
                .then((res) => {
                    const { Description, image, status } = res.data.data;
                    setFormData({
                        Description: Description,
                        image: image, // This is the URL from DB
                        status: status // Keep as boolean
                    });
                });
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
                    <div className="max-w-2xl mx-auto bg-slate-800 rounded-2xl shadow-lg p-6 md:p-8">
                        {/* Title */}

                        <Link to="/AddAchievements">
                            <h2 className="text-xl md:text-2xl font-semibold mb-6">
                                Add Achievements
                            </h2>
                        </Link>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Skill Name */}
                            <div>
                                <label className="block mb-2 text-sm">Description</label>
                                <input
                                    type="text"
                                    name="Description"
                                    value={formData.Description}
                                    onChange={handleChange}
                                    placeholder="Enter skill name"
                                    className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm">Image</label>
                                <input
                                    type="file"
                                    name="image"
                                    // Removed value={formData.image} as it causes "Failed to set the 'value' property" error
                                    onChange={(e) => {
                                        // Optional: if you want to handle file preview for new selection
                                        // But for now, just making sure we don't break the controlled input rule
                                    }}
                                    className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    required={!paramsId} // Only required when adding new achievement
                                />
                                {paramsId && formData.image && (
                                    <div className="mt-4">
                                        <p className="text-sm mb-2 text-slate-400">Current Image:</p>
                                        <img
                                            src={formData.image}
                                            alt="Current Achievement"
                                            className="w-32 h-32 object-cover rounded-lg border border-slate-600"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block mb-2 text-sm">Status</label>
                                <select
                                    name="status"
                                    value={String(formData.status)}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            status: e.target.value == "true",
                                        })
                                    }
                                    className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600"
                                >
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg text-sm font-medium"
                                >
                                    Submit
                                </button>

                                <button
                                    type="reset"
                                    className="bg-slate-600 hover:bg-slate-700 px-6 py-2 rounded-lg text-sm"
                                    onClick={() => setFormData({ Description: "", image: "", status: true })}
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
