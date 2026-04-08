import React, { useEffect, useState } from "react";
import Header from "../Common/Header";
import Sidebar from "../Middle-Section/Sidebar";
import { FaBriefcase, FaProjectDiagram, FaEnvelope, FaCode, FaPlus, FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router";
import axios from "axios";

export default function Home() {
  const [stats, setStats] = useState({
    projects: 0,
    experience: 0,
    skills: 0,
    messages: 0,
  });

  const baseurl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // In a real app, you'd fetch these counts from your API
    // For now, these are beautiful placeholders that represent your data
    setStats({
      projects: 40,
      experience: "2.5 years",
      skills: 28,
      messages: 8,
    });
  }, []);

  const statCards = [
    { title: "Total Projects", count: stats.projects, icon: <FaProjectDiagram />, color: "from-blue-500 to-cyan-400" },
    { title: "Experiences", count: stats.experience, icon: <FaBriefcase />, color: "from-purple-500 to-pink-500" },
    { title: "Pro Skills", count: stats.skills, icon: <FaCode />, color: "from-orange-400 to-yellow-500" },
    { title: "Messages", count: stats.messages, icon: <FaEnvelope />, color: "from-green-500 to-emerald-400" },
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-slate-200">
      <Header />

      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:block w-72 shrink-0 border-r border-slate-800">
          <Sidebar />
        </div>

        {/* Main Dashboard Content */}
        <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
          {/* Welcome Section */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back, Admin 👋</h1>
            <p className="text-slate-400">Here's what's happening with your portfolio today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {statCards.map((card, idx) => (
              <div key={idx} className="relative group overflow-hidden bg-slate-800/50 border border-slate-700 p-6 rounded-2xl hover:border-slate-500 transition-all duration-300 shadow-xl">
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${card.color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`}></div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color} text-black shadow-lg shadow-black/20`}>
                    {React.cloneElement(card.icon, { size: 24 })}
                  </div>
                </div>
                <div>
                  <h3 className="text-slate-400 text-sm font-medium mb-1">{card.title}</h3>
                  <p className="text-3xl font-bold text-white">{card.count}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions & Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-1 space-y-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                Quick Actions
              </h2>
              <div className="space-y-4">
                <Link to="/AddExperience" className="flex items-center justify-between p-4 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-500/10 p-2 rounded-lg text-yellow-500">
                      <FaPlus size={18} />
                    </div>
                    <span className="font-medium">Add New Experience</span>
                  </div>
                  <FaExternalLinkAlt className="text-slate-500 group-hover:text-yellow-500 transition-colors" size={14} />
                </Link>

                <Link to="/Addskills" className="flex items-center justify-between p-4 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500/10 p-2 rounded-lg text-blue-500">
                      <FaPlus size={18} />
                    </div>
                    <span className="font-medium">Add New Skill</span>
                  </div>
                  <FaExternalLinkAlt className="text-slate-500 group-hover:text-blue-500 transition-colors" size={14} />
                </Link>

                <Link to="/AddSocial" className="flex items-center justify-between p-4 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-500/10 p-2 rounded-lg text-purple-500">
                      <FaPlus size={18} />
                    </div>
                    <span className="font-medium">Add Social Link</span>
                  </div>
                  <FaExternalLinkAlt className="text-slate-500 group-hover:text-purple-500 transition-colors" size={14} />
                </Link>
              </div>
            </div>

            {/* Recent Experience Summary (Preview) */}
            <div className="lg:col-span-2">
              <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 h-full shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">Platform Health</h2>
                  <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs font-bold border border-green-500/20">Operational</span>
                </div>

                <div className="space-y-6 text-sm text-slate-400">
                  <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                    <span>API Server Response</span>
                    <span className="text-green-400 font-medium">9ms</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                    <span>Database Storage</span>
                    <span className="text-white font-medium">12.4 MB / 512 MB</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700">
                    <span>Cloudinary Bandwidth</span>
                    <span className="text-white font-medium">Active</span>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-2xl">
                  <p className="text-yellow-500 font-bold mb-1">Backup Recommendation</p>
                  <p className="text-slate-300">Your database has 8 new message records. Consider exporting them soon.</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

