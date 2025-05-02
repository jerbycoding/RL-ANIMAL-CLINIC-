import React, { useState, useRef, useEffect } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import catTopBar from '/THESIS SYSTEM/frontend/src/assets/Topbar/catTopBar.png'
export default function Topbar() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    navigate("/login");
    setIsDropdownOpen(false);
    setIsLogoutModalOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="w-full">
      <img src={catTopBar} alt=""  className="absolute h-16 w-full"/>
  
    <div className="flex justify-between items-center p-4  dark:bg-gray-800 shadow-md relative">

      <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 z-10">
        WALA PA PONG LOGO HEHE
      </h1>
      <div className="flex items-center gap-4">
        <FaBell className="text-black-600 dark:text-gray-300 text-xl cursor-pointer z-10" />
        <div className="relative">
          <FaUserCircle
            className="text-black-600 dark:text-gray-300 text-xl cursor-pointer"
            onClick={toggleDropdown}
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          />
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabIndex="-1"
            >
              <div className="py-1" role="none">
                <button
                  onClick={() => setIsLogoutModalOpen(true)}
                  className="block w-full text-left px-4 py-2 text-sm text-red-500 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600"
                  role="menuitem"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Confirm Logout</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Are you sure you want to log out?</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
