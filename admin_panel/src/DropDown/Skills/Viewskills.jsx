import axios from 'axios';
import Header from '../../Common/Header'
import Sidebar from '../../Middle-Section/Sidebar'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Link } from 'react-router';

export default function Viewskills() {
    let baseurl = import.meta.env.VITE_API_URL;
    console.log(baseurl);

    const [viewskills, setviewskills] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredSkills = viewskills.filter((skill) =>
        skill.SkillsName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const skillsView = () => {
        axios
            .post(
                `${baseurl}/api/backend/skills/view`,
            )
            .then((res) => {
                if (res.data.status) {
                    setviewskills(res.data.data);
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
                `${baseurl}/api/backend/skills/status-change/`,
                obj,
            )
            .then((res) => {
                if (res.data.status) {
                    toast.success("status changed successfully");
                    skillsView();
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
                    `${baseurl}/api/backend/skills/delete/${id}`,
                )
                .then((res) => {
                    if (res.data.status) {
                        toast.success("skills deleted successfully");
                        skillsView();
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
        skillsView();
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

                    <div className="bg-slate-800 rounded-xl shadow-lg overflow-hidden">

                        {/* Header */}
                        <div className="p-4 border-b border-slate-700 flex flex-col md:flex-row gap-4 justify-between items-center">
                            <h2 className="text-lg font-semibold">Skills List</h2>
                            
                            <div className="flex flex-1 max-w-md w-full gap-2">
                                <input
                                    type="text"
                                    placeholder="Search skills..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:border-yellow-500 text-sm"
                                />
                            </div>

                            <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg text-sm whitespace-nowrap">
                                <Link to="/Addskills">
                                    + Add Skill
                                </Link>
                            </button>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-700 text-gray-300 uppercase text-xs">
                                    <tr>
                                        <th className="px-4 py-3">No</th>
                                        <th className="px-4 py-3">Skill Name</th>
                                        <th className="px-4 py-3">Icon</th>
                                        <th className="px-4 py-3">Parent</th>
                                        <th className="px-4 py-3">%</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3 text-center">Action</th>
                                    </tr>
                                </thead>

                                {
                                    filteredSkills.length > 0 ? filteredSkills.map((v, i) => {
                                        console.log("V", v)
                                        return (
                                            <tbody className="divide-y divide-slate-700" key={i}>
                                                <tr className="hover:bg-slate-700 transition">
                                                    <td className="px-4 py-3">{i + 1}</td>
                                                    <td className="px-4 py-3 font-medium">{v.SkillsName}</td>

                                                    {/* Icon */}
                                                    <td className="px-4 py-3">
                                                        <img
                                                            src={v.SkillsIcon}
                                                            alt="icon"
                                                            className="w-8 h-8 rounded"
                                                        />
                                                    </td>

                                                    <td className="px-4 py-3">{v.parentskills?.Skills}</td>

                                                    {/* Percentage */}
                                                    <td className="px-4 py-3">
                                                        <div className="w-full bg-slate-600 rounded-full h-2 mb-1">
                                                            <div 
                                                                className="bg-yellow-400 h-2 rounded-full" 
                                                                style={{ width: `${v.percentage}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="text-xs text-gray-400">{v.percentage}%</span>
                                                    </td>

                                                    {/* Status */}
                                                    <td className="px-4 py-3">
                                                        {
                                                            v.status == true ?

                                                                <button className="cursor-pointer bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs" onClick={() => toggleStatus(v._id, v.status)}>
                                                                    Active
                                                                </button> : <button className="cursor-pointer bg-red-500/20 text-white px-2 py-1 rounded text-xs" onClick={() => toggleStatus(v._id, v.status)}>
                                                                    deactive
                                                                </button>
                                                        }


                                                    </td>

                                                    {/* Actions */}
                                                    <td className="px-4 py-3 text-center space-x-2">
                                                        <button className="cursor-pointer bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-xs">
                                                            <Link to={`/Addskills/${v._id}`}>
                                                                Edit
                                                            </Link>
                                                        </button>
                                                        <button className="cursor-pointer bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-xs" onClick={() => deleteitem(v._id)}>
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        )
                                    }) :
                                        <tr>
                                            <td colSpan={7} className="text-center py-4">
                                                No data found
                                            </td>
                                        </tr>
                                }


                            </table>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    )
}