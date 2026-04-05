import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { FaBook, FaUserGraduate, FaLayerGroup, FaCode } from "react-icons/fa";
import { MdWork } from "react-icons/md";

export default function Sidebar() {
  const [openIndex, setOpenIndex] = useState(null);

  const MYdropDown = [
    {
      MenuName: "My Projects",
      icon: <MdWork />,
      submenuName: [
        { submenu: "Add Portfolio", path: "/Addportfolio" },
        { submenu: "View Portfolio", path: "/Viewportfolio" },
      ],
    },
    {
      MenuName: "Resume",
      icon: <FaUserGraduate />, // changed
      submenuName: [
        { submenu: "Add Resume", path: "/AddResume" },
        { submenu: "View Resume", path: "/ViewResume" },
      ],
    },
    {
      MenuName: "Catgory",
      icon: <FaLayerGroup />, // changed
      submenuName: [
        { submenu: "Add Category", path: "/Addcategory" },
        { submenu: "View Category", path: "/Viewcategory" },
      ],
    },
    {
      MenuName: "skills",
      icon: <FaCode />, // changed
      submenuName: [
        { submenu: "Add skills", path: "/Addskills" },
        { submenu: "View skills", path: "/Viewskills" },
      ],
    },
  ];

  const toggleMenu = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <aside className="max-w-[220px] h-screen bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700 sticky top-0 shadow-xl">
      {/* LOGO / TITLE */}
      <div className="p-5 border-b border-slate-700">
        <h2 className="text-xl font-bold text-white tracking-wide">
          🚀 Admin Panel
        </h2>
      </div>

      {/* MENU */}
      <div className="p-3">
        <ul className="flex flex-col gap-2">
          {MYdropDown.map((item, index) => (
            <li key={index}>
              {/* MAIN MENU */}
              <div
                onClick={() => toggleMenu(index)}
                className={`flex justify-between items-center px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 group
                ${openIndex === index
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                    : "text-gray-300 hover:bg-slate-700"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-semibold">{item.MenuName}</span>
                </div>

                <IoIosArrowForward
                  className={`transition-transform duration-300 ${openIndex === index ? "rotate-90" : ""
                    }`}
                />
              </div>

              {/* SUBMENU */}
              <ul
                className={`ml-6 mt-1 overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-40" : "max-h-0"
                  }`}
              >
                {item.submenuName.map((sub, i) => (
                  <li key={i}>
                    <NavLink
                      to={sub.path}
                      className={({ isActive }) =>
                        `block px-3 py-2 text-sm rounded-lg transition-all duration-200
                        ${isActive
                          ? "bg-indigo-500/20 text-indigo-400 font-semibold border-l-4 border-indigo-500"
                          : "text-gray-400 hover:text-white hover:bg-slate-700"
                        }`
                      }
                    >
                      {sub.submenu}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
