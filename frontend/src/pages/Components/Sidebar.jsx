import { FaTachometerAlt, FaCalendarAlt, FaPaw, FaCog } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white dark:bg-gray-800 p-4 shadow-lg">
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">RL Clinic</h2>
      <ul className="space-y-2">
        <NavLink to="/dashboard/clinic" className="flex items-center gap-2 p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
          <FaTachometerAlt /> Dashboard
        </NavLink>
        <NavLink to="/dashboard/PatientManagement" className="flex items-center gap-2 p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
          <FaPaw /> Patient Management
        </NavLink>
        <NavLink to="/dashboard/Checkup" className="flex items-center gap-2 p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
          <FaPaw /> Check Up
        </NavLink>
        <NavLink to="/dashboard/Appointments"className="flex items-center gap-2 p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
          <FaCalendarAlt /> Appointments
        </NavLink>
        <NavLink to="/dashboard/Inventory" className="flex items-center gap-2 p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
          <FaCalendarAlt /> Inventory
        </NavLink>
        <NavLink to ="/dashboard/StaffManagement" className="flex items-center gap-2 p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
          <FaCalendarAlt /> Staff Management
        </NavLink>
        <NavLink to="/dashboard/Billing" className="flex items-center gap-2 p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">
          <FaPaw /> Billing & Invoices
        </NavLink>
      </ul>
    </div>
  );
}