import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            className="h-8 w-8"
          />
          <span className="text-lg font-semibold ml-2">smart diet Planner</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/dashboard" className="text-gray-700 hover:text-indigo-500">
            Dashboard
          </Link>
          
          <Link to="/community" className="text-gray-700 hover:text-indigo-500">
            community
          </Link>
          
          <Link to="/setting" className="text-gray-700 hover:text-indigo-500">
            setting
          </Link>
        </div>

        
        {/* <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search"
            className="border rounded-md px-3 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div> */}

        {/* User Profile & Notifications */}
        <div className="flex items-center space-x-4">
          {/* Notification Icon */}
          <button className="text-gray-600 hover:text-indigo-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
          </button>

          {/* User Avatar */}
          <button className="flex items-center space-x-2">
            <img
              alt="User"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="h-8 w-8 rounded-full"
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
