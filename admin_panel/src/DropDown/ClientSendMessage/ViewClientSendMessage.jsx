import React, { useEffect, useState } from "react";
import Header from "../../Common/Header";
import Sidebar from "../../Middle-Section/Sidebar";
import { FaEnvelope, FaPhone, FaUser, FaCalendarAlt, FaSearch } from "react-icons/fa";
import axios from "axios";

export default function ViewClientSendMessage() {
    const [projectdata, setProjectdata] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    let baseurl = import.meta.env.VITE_API_URL;

    let viewApi = () => {
        axios
            .post(`${baseurl}/api/backend/clientMessage/view`)
            .then((result) => {
                if (result.data.status) {
                    setProjectdata(result.data.data);
                } else {
                    console.log(result.data.message);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        viewApi();
    }, []);

    // Simple client-side search for UI enhancement
    const filteredMessages = projectdata.filter(msg => 
        msg.yourName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        msg.yourEmail.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
            <Header />

            <div className="flex">
                <div className="hidden lg:block w-70 min-h-[calc(100vh-64px)] border-r border-slate-800">
                    <Sidebar />
                </div>

                <main className="flex-1 p-4 md:p-8 space-y-8">
                    {/* PAGE HEADER */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm shadow-xl">
                        <div>
                            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                                📩 Client Inquires
                            </h1>
                            <p className="text-slate-400 text-sm mt-1">Manage and respond to messages from your portfolio visitors.</p>
                        </div>

                        <div className="relative w-full sm:w-72 group">
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm shadow-inner"
                            />
                        </div>
                    </div>

                    {/* MESSAGES TABLE */}
                    <div className="bg-slate-800/50 rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden backdrop-blur-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-700/30 text-slate-300">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">#</th>
                                        <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Client Details</th>
                                        <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Contact Info</th>
                                        <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Message Content</th>
                                        <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-right">Received Date</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-700/50">
                                    {filteredMessages.length > 0 ? (
                                        filteredMessages.map((message, index) => (
                                            <tr
                                                key={message._id || index}
                                                className="hover:bg-slate-700/30 transition-all duration-200 group"
                                            >
                                                <td className="px-6 py-5 align-top">
                                                    <span className="text-slate-500 text-xs font-mono">{(index + 1).toString().padStart(2, '0')}</span>
                                                </td>

                                                <td className="px-6 py-5 align-top">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                                                            <FaUser size={14} />
                                                        </div>
                                                        <span className="font-bold text-slate-200">{message.yourName}</span>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-5 align-top space-y-1.5">
                                                    <div className="flex items-center gap-2 text-sm text-slate-300 group-hover:text-indigo-300 transition-colors">
                                                        <FaEnvelope size={12} className="text-slate-500" />
                                                        <span>{message.yourEmail}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-slate-300">
                                                        <FaPhone size={12} className="text-slate-500" />
                                                        <span>{message.yourPhoneNumber}</span>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-5 align-top max-w-md">
                                                    <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/40 text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                                                        {message.yourMessage}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-5 align-top text-right">
                                                    <div className="flex flex-col items-end">
                                                        <div className="flex items-center gap-2 text-xs font-medium text-indigo-400 bg-indigo-500/5 px-2 py-1 rounded-md border border-indigo-500/10">
                                                            <FaCalendarAlt size={10} />
                                                            {new Date(message.created_at).toLocaleDateString("en-IN", {
                                                                day: '2-digit',
                                                                month: 'short',
                                                                year: 'numeric'
                                                            })}
                                                        </div>
                                                        <span className="text-[10px] text-slate-500 mt-1 uppercase tracking-tighter">
                                                            {new Date(message.created_at).toLocaleTimeString("en-IN", {
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-20 text-center">
                                                <div className="flex flex-col items-center gap-3 text-slate-500">
                                                    <div className="text-4xl">📭</div>
                                                    <p className="text-lg font-medium">No messages found</p>
                                                    <p className="text-sm">When clients send you inquiries, they will appear here.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* TABLE FOOTER */}
                        <div className="bg-slate-800/80 px-6 py-3 border-t border-slate-700/50 flex justify-between items-center">
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Total Inquiries: {filteredMessages.length}</span>
                            <div className="flex gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Live Data</span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
