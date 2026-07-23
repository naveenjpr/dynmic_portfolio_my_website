import React from "react";
import Header from "../Common/Header";
import Sidebar from "../Middle-Section/Sidebar";
import { useSidebar } from "../Context/SidebarContext";

export default function AdminLayout({ children }) {
  const { sidebarOpen } = useSidebar();

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200">
      <Header />

      <div className="flex overflow-hidden">
        {/* Sidebar - slides in/out with smooth animation */}
        <div
          className={`shrink-0 border-r border-slate-800 transition-all duration-300 ease-in-out overflow-hidden
            ${sidebarOpen ? "w-72 opacity-100" : "w-0 opacity-0"}`}
        >
          <Sidebar />
        </div>

        {/* Main Content - expands to full width when sidebar hidden */}
        <main className="flex-1 overflow-y-auto transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}
