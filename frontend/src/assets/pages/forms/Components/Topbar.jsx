import { FaBell, FaUserCircle } from "react-icons/fa";
import ToggleButton from "./ToggleButton";

export default function Topbar() {
  return (
    <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
      <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
        RL ANIMAL CLINIC <ToggleButton />
      </h1>
      <div className="flex items-center gap-4">
        <h4 className="text-gray-700 dark:text-gray-300">Mark Lander M. Durias</h4>
        <FaBell className="text-gray-600 dark:text-gray-300 text-xl" />
        <FaUserCircle className="text-gray-600 dark:text-gray-300 text-xl" />
      </div>
    </div>
  );
}