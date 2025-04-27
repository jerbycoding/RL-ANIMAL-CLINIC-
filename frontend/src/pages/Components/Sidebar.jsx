import { FaTachometerAlt, FaCalendarAlt, FaPaw, FaCog } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";



export default function Sidebar() {
  const navLinkClass = ({ isActive }) =>
    `relative flex items-center gap-2 p-2 pl-4 rounded-md font-bold-700 transition-all duration-200
     ${isActive ? "border-l-4 border-blue-500 bg-gray-100 dark:bg-gray-700 font-semibold" : ""}
     text-gray-700 dark:text-gray-300 
     hover:bg-gray-200 dark:hover:bg-gray-600 
     hover:text-[17px]`;
  

  return (
    <div className="Sidebar w-64 bg-white dark:bg-gray-800 p-4 shadow-lg">
      {/*<h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">RL Clinic</h2>*/}
      <ul className="space-y-2">
        <NavLink to="/dashboard" className={navLinkClass}>
          <FaTachometerAlt /> Dashboard
        </NavLink>
        <NavLink to="/dashboard/PatientManagement" className={navLinkClass}>
          <FaPaw /> Patient Management
        </NavLink>
        <NavLink to="/dashboard/Checkup" className={navLinkClass}>
          <FaPaw /> Check Up
        </NavLink>
        <NavLink to="/dashboard/Appointments"className={navLinkClass}>
          <FaCalendarAlt /> Appointments
        </NavLink>
        <NavLink to="/dashboard/Inventory" className={navLinkClass}>
          <FaCalendarAlt /> Inventory
        </NavLink>
        <NavLink to ="/dashboard/StaffManagement" className={navLinkClass}>
          <FaCalendarAlt /> Staff Management
        </NavLink>
        <NavLink to="/dashboard/Billing" className={navLinkClass}>
          <FaPaw /> Billing & Invoices
        </NavLink>
      </ul>
    </div>
  );
}