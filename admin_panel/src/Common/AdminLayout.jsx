import React from "react";
import Header from "../Common/Header";
import Sidebar from "../Middle-Section/Sidebar";
import { useSidebar } from "../Context/SidebarContext";

export default function AdminLayout({ children }) {
  const { sidebarOpen, toggleSidebar } = useSidebar();

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 flex flex-col relative">
      <Header />

      <div className="flex flex-1 overflow-hidden relative">
        {/* MOBILE OVERLAY BACKDROP */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/60 z-30 lg:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* SIDEBAR */}
        <div
          className={`shrink-0 bg-linear-to-b from-slate-900 to-slate-800 z-40 
            absolute top-0 bottom-0 left-0 lg:static lg:h-auto
            border-r border-slate-700 shadow-xl
            ${sidebarOpen ? "block w-72" : "hidden"}
          `}
        >
          <div className="w-72 h-full">
            <Sidebar />
          </div>
        </div>

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto min-h-[calc(100vh-64px)] w-full">
          {children}
        </main>
      </div>
    </div>
  );
}