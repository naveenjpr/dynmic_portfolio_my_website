import axios from 'axios';
import Header from '../../Common/Header'
import Sidebar from '../../Middle-Section/Sidebar'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';

export default function Addskills() {
    let baseurl = import.meta.env.VITE_API_URL;
    let params = useParams()
    let paramsId = params.id

    const [imageview, setimageview] = useState("")
    const [formData, setFormData] = useState({
        SkillsName: "",
        SkillsIcon: "",
        SkillsIcon_public_id: "",
        percentage: "",
        parentskills: "", // postman me id send kare ge
        status: true,
    });


    const [vieparentskills, setviewparentskills] = useState([]);
    const navigate = useNavigate();

    console.log(baseurl);

    const handleSubmit = (e) => {
        e.preventDefault()

        const form = new FormData(e.target)
        form.set("status", formData.status ? true : false)


        if (paramsId) {

            axios
                .put(
                    `${baseurl}/api/backend/skills/update/${paramsId}`, form,

                )
                .then((res) => {
                    if (res.data.status) {
                        toast.success("skills update successfully!");

                        setTimeout(() => {
                            navigate("/Viewskills");
                        }, 2000);
                    } else {
                        toast.error("Failed to add category.");
                    }
                })
                .catch((err) => {
                    console.error("Error adding category:", err);
                    toast.error("Error adding category.");
                });

        }
        else {
            axios
                .post(
                    `${baseurl}/api/backend/skills/add`,
                    form,
                )
                .then((res) => {
                    console.log(res.data);
                    if (res.data.status) {
                        toast.success("skills added successfully!");

                        setTimeout(() => {
                            navigate("/Viewskills");
                        }, 2000);
                    } else {
                        toast.error("Failed to add category.");
                    }
                })
                .catch((err) => {
                    console.error("Error adding category:", err);
                    toast.error("Error adding category.");
                });

        }

        // 👉 API call yaha laga sakta hai
    }



    useEffect(() => {
        if (paramsId) {
            axios
                .post(
                    `${baseurl}/api/backend/skills/detail/${paramsId}`,
                )
                .then((res) => {
                    if (res.data.status) {
                        const { SkillsName, SkillsIcon, percentage, parentskills, status } = res.data.data;
                        setFormData({
                            SkillsName: SkillsName || "",
                            SkillsIcon: SkillsIcon || "",
                            percentage: percentage || "",
                            parentskills: parentskills?._id || "",
                            status: status ?? true
                        });
                        if (SkillsIcon) {
                            setimageview(SkillsIcon);
                        }
                    } else {
                        toast.error(res.data.message || "Failed to fetch skill details");
                    }
                })
                .catch(err => {
                    console.error("Error fetching skill details:", err);
                    toast.error("Something went wrong");
                });
        } else {
            // Reset form when moving to 'Add' mode from 'Edit' mode
            setFormData({
                SkillsName: "",
                SkillsIcon: "",
                SkillsIcon_public_id: "",
                percentage: "",
                parentskills: "",
                status: true,
            });
            setimageview("");
        }
    }, [paramsId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setFormData({
            SkillsName: "",
            SkillsIcon: "",
            SkillsIcon_public_id: "",
            percentage: "",
            parentskills: "",
            status: true,
        });
        setimageview("");
    };
    useEffect(() => {

        axios.post(
            `${baseurl}/api/backend/skills/parent-category`,
        )
            .then((res) => {
                if (res.data.status) {
                    setviewparentskills(res.data.data);
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                console.error(err);
                toast.error("Something went wrong");
            });

    }, []);

    return (
        <div className="min-h-screen bg-slate-900 text-white">
            <Header />

            <div className="flex">
                {/* Sidebar */}
                <div className="hidden md:block w-64 border-r border-slate-800">
                    <Sidebar />
                </div>

                {/* Main Content */}
                <main className="flex-1 p-4 md:p-8">

                    <div className="max-w-3xl mx-auto bg-slate-800 rounded-xl shadow-lg">

                        {/* Header */}
                        <div className="p-4 border-b border-slate-700">
                            <h2 className="text-lg font-semibold">{paramsId ? "Edit Skill" : "Add Skill"}</h2>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} onReset={handleReset} className="p-6 space-y-5">

                            {/* Skill Name */}
                            <div>
                                <label className="block text-sm mb-1">Skill Name</label>
                                <input
                                    type="text"
                                    name="SkillsName"
                                    value={formData.SkillsName}
                                    onChange={handleInputChange}
                                    placeholder="Enter skill name"
                                    className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:border-yellow-500"
                                />
                            </div>

                            {/* Parent Skill */}
                            <div>
                                <label className="block text-sm mb-2">Parent Skill</label>

                                <div className="relative">
                                    <select
                                        name="parentskills"
                                        value={formData.parentskills}
                                        onChange={(e) =>
                                            setFormData({ ...formData, parentskills: e.target.value })
                                        }
                                        className="w-full px-4 py-2 pr-10 rounded-lg bg-slate-700 border border-slate-600"
                                    >
                                        <option value="">Select Parent Skill</option>

                                        {vieparentskills.map((v) => (
                                            <option key={v._id} value={v._id}>
                                                {v.Skills}
                                            </option>
                                        ))}
                                    </select>

                                    {/* Dropdown icon */}
                                    <div className="absolute right-3 top-2.5 pointer-events-none text-gray-400">
                                        ▼
                                    </div>
                                </div>

                                {/* Info text */}
                                <p className="text-xs text-gray-400 mt-1">
                                    Select a parent category for better organization
                                </p>
                            </div>

                            {/* Percentage */}
                            <div>
                                <label className="block text-sm mb-1">Percentage</label>
                                <input
                                    type="number"
                                    name="percentage"
                                    value={formData.percentage}
                                    onChange={handleInputChange}
                                    placeholder="Enter percentage"
                                    className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:border-yellow-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-1">Skill Icon</label>
                                <input
                                    type="file"
                                    name="SkillsIcon"
                                    onChange={(event) => {
                                        if (event.target.files && event.target.files[0]) {
                                            let currentUrl = URL.createObjectURL(event.target.files[0]);
                                            setimageview(currentUrl);
                                        }
                                    }}
                                    className="w-full text-sm bg-slate-700 border border-slate-600 rounded-lg p-2"
                                />

                                {imageview && (
                                    <div className="mt-3">
                                        <img
                                            src={imageview}
                                            alt="Skill Preview"
                                            className="w-20 h-20 object-cover rounded-lg border border-slate-600"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Status Toggle */}
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    name="status"
                                    checked={formData.status}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            status: e.target.checked
                                        })
                                    }
                                    className="w-4 h-4 accent-yellow-500"
                                />
                                <label className="text-sm">Active Status</label>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-5 py-2 rounded-lg text-sm"
                                >
                                    Save Skill
                                </button>

                                <button
                                    type="reset"
                                    className="bg-slate-600 hover:bg-slate-500 px-5 py-2 rounded-lg text-sm"
                                >
                                    Reset
                                </button>
                            </div>

                        </form>
                    </div>

                </main>
            </div>
        </div>
    )
}