import React from "react";
import { IoReorderThreeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Header() {
  const navLinks = [{ name: "Home", to: "/" }];

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-[10px]">
            <Link to="/" className="flex items-center">
              <img
                src="https://themewagon.com/wp-content/uploads/2021/03/Frame-172-1.png"
                alt="logo"
                className="w-[150px] h-[100px] object-contain"
              />
            </Link>
            <button
              aria-label="menu"
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <IoReorderThreeOutline className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-[12px]">
            <Link
              to="/login"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Login
            </Link>

            <div className="flex items-center gap-[10px]">
              <div className="text-sm">
                <div className="font-medium text-gray-800">My Profile</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
