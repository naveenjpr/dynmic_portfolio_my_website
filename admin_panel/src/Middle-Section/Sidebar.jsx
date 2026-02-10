import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { FaBook } from "react-icons/fa";
import { LiaSlidersHSolid } from "react-icons/lia";
import { GiTeamDowngrade } from "react-icons/gi";
import { FaUsers, FaVideo } from "react-icons/fa6";

export default function Sidebar() {
  const [openIndex, setOpenIndex] = useState(null);

  const MYdropDown = [
    {
      MenuName: "Courses",
      icon: <FaBook />,
      submenuName: [
        { submenu: "Add Courses", path: "/AddCourses" },
        { submenu: "View Courses", path: "/ViewCourses" },
      ],
    },
  ];

  const toggleMenu = (index, hasSubmenu) => {
    if (!hasSubmenu) return;
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <aside className="w-[200px] h-screen border-r bg-white sticky top-0">
      <div className="px-4 pt-6">
        <ul className="flex flex-col gap-2">
          {MYdropDown.map((item, index) => (
            <li key={index} className="rounded-md">
              <div
                onClick={() => toggleMenu(index, item.submenuName?.length)}
                className={`flex justify-between items-center px-3 py-2 cursor-pointer rounded-md transition-colors duration-200
                ${
                  openIndex === index
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg text-gray-500">{item.icon}</span>
                  <span className="text-sm font-medium">{item.MenuName}</span>
                </div>

                {item.submenuName?.length > 0 && (
                  <IoIosArrowForward
                    className={`text-gray-400 transition-transform duration-200 ${openIndex === index ? "rotate-90 text-white" : ""}`}
                  />
                )}
              </div>

              {item.submenuName?.length > 0 && (
                <ul
                  className={`ml-10 overflow-hidden transition-all duration-300
                    ${openIndex === index ? "max-h-40 mt-2" : "max-h-0"}`}
                >
                  {item.submenuName.map((sub, i) => (
                    <li key={i}>
                      <NavLink
                        to={sub.path}
                        className={({ isActive }) =>
                          `block py-2 text-sm rounded-l-md pl-2 transition-colors duration-150 ${
                            isActive
                              ? "text-indigo-600 bg-indigo-50 font-semibold"
                              : "text-gray-600 hover:text-indigo-600"
                          }`
                        }
                      >
                        {sub.submenu}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
