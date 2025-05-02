import React from "react";
import { FaTachometerAlt, FaCalendarAlt, FaPaw, FaCog } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import sideBarBG from '/THESIS SYSTEM/frontend/src/assets/SidebarBG.png'
export default function Sidebar() {
  // Assuming you have access to the user's role from your authentication context or state
  const userRole = localStorage.getItem("role"); // Replace with your actual role retrieval

  // Get the current location to apply active class correctly
  const location = useLocation();

  // Define the navigation links and the roles allowed to see them
  const navLinks = [
    {
      to: "/dashboard/clinic",
      label: "Dashboard",
      icon: <FaTachometerAlt />,
      allowedRoles: ["veterinary", "admin"],
    },
    {
      to: "/dashboard/PatientManagement",
      label: "Patient Management",
      icon: <FaPaw />,
      allowedRoles: ["veterinary", "admin"],
    },
    {
      to: "/dashboard/Checkup",
      label: "Check Up",
      icon: <FaPaw />,
      allowedRoles: ["veterinary", "staff", "admin"],
    },
    {
      to: "/dashboard/Appointments",
      label: "Appointments",
      icon: <FaCalendarAlt />,
      allowedRoles: ["veterinary", "staff", "admin"],
    },
    {
      to: "/dashboard/Services", // New Services Link
      label: "Services",
      icon: <FaCog />, // You can choose a relevant icon
      allowedRoles: ["admin"], // Adjust roles as needed
    },
    {
      to: "/dashboard/Inventory",
      label: "Inventory",
      icon: <FaCalendarAlt />,
      allowedRoles: ["admin"], // Only admin can see this based on your routes
    },
    {
      to: "/dashboard/StaffManagement",
      label: "Staff Management",
      icon: <FaCalendarAlt />,
      allowedRoles: ["admin"], // Only admin can see this based on your routes
    },
    {
      to: "/dashboard/Billing",
      label: "Billing & Invoices",
      icon: <FaPaw />,
      allowedRoles: ["staff", "admin"],
    },
    // You can add more links here as needed
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 p-4 shadow-lg relative">

      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
        RL Clinic
      </h2>
      <ul className="space-y-2">
        {navLinks
          .filter((link) => link.allowedRoles.includes(userRole))
          .map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={`flex items-center z-30   gap-2 p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md ${
                location.pathname.startsWith(link.to) ? 'bg-gray-200 dark:bg-gray-700 font-semibold' : ''
              }`}
            >
              {link.icon} {link.label}
            </NavLink>
          ))}
      </ul>
    </div>
 
  );
}