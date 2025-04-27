import React, { useEffect, useState } from "react";
import axios from "axios";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { CiViewTable } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const StaffTable = () => {
    const [staff, setStaff] = useState([]);
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState("table");

  // Fetch staff members from API
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get("http://localhost:5000/staff");
        setStaff(response.data);
      } catch (error) {
        console.error("Error fetching staff:", error);
      }
    };

    fetchStaff();
  }, []);

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/staff/${id}`);
      setStaff(staff.filter((member) => member._id !== id));
      alert("Staff member deleted successfully!");
    } catch (error) {
      console.error("Error deleting staff:", error);
      alert("Failed to delete staff member.");
    }
  };

  // Handle edit action (example placeholder)
  const handleEdit = (id) => {
    alert(`Editing staff member with ID: ${id}`);
    // Add logic for opening an edit form or modal
  };

  // Handle view details action (example placeholder)
  const handleViewDetails = (id) => {
    alert(`Viewing details for staff member with ID: ${id}`);
    // Add logic for opening a detailed view
  };

  return (
    <div className="">
<div className="flex justify-center items-center gap-8  pb-2">
      {/* Calendar Icon */}
      

      {/* Table Icon */}
      <div
        className={`cursor-pointer flex flex-col items-center ${
          activeTab === "table" ? "text-blue-500" : "text-gray-600"
        }`}
        onClick={() => setActiveTab("table")}
      >
        <CiViewTable className="text-5xl transition duration-200" onClick={()=>{setIsSechedule(false)}} />
        <div
          className={`h-1 w-20 mt-1 rounded-full transition-all ${
            activeTab === "table" ? "bg-blue-500" : "bg-transparent"
          }`}
        ></div>
      </div>
      <div
        className={`cursor-pointer flex flex-col items-center ${
          activeTab === "calendar" ? "text-blue-500" : "text-gray-600"
        }`}
        onClick={() => setActiveTab("calendar")}
      >
        <RiCalendarScheduleLine className="text-5xl transition duration-200" onClick={()=>{setIsSechedule(true)}} />
        <div
          className={`h-1 w-20 mt-1 rounded-full transition-all ${
            activeTab === "calendar" ? "bg-blue-500" : "bg-transparent"
          }`}
        ></div>
      </div>
    </div>



    <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Staff Management</h1>
            <button onClick={()=>{
                navigate('/StaffForm');
            }} class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Add Form</button>
    </div>

      {/* Responsive Table */}
            {activeTab == "table" ? ( <table className="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden shadow-md">
        <thead className="bg-sky-100">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Role</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Phone</th>
            <th className="p-4 text-left">Specialization</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((member, index) => (
            <tr
              key={member._id}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"} // Alternate row colors
            >
              <td className="p-4">{member.name}</td>
              <td className="p-4">{member.role}</td>
              <td className="p-4">{member.email}</td>
              <td className="p-4">{member.phone || "N/A"}</td>
              <td className="p-4">{member.specialization || "N/A"}</td>
              <td className="p-4 text-center">
                {/* Action Buttons */}
                <button
                  onClick={() => handleViewDetails(member._id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 mr-2"
                >
                  View
                </button>
                <button
                  onClick={() => handleEdit(member._id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(member._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>) : (    <table className="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden shadow-md">
        <thead className="bg-sky-100">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Role</th>
            <th className="p-4 text-left">Specialization</th>
            <th className="p-4 text-left">Shifts</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((member) => (
            <tr key={member._id} className="bg-gray-50 border-b border-gray-300">
              <td className="p-4 font-semibold">{member.name}</td>
              <td className="p-4">{member.role}</td>
              <td className="p-4 italic">{member.specialization || "N/A"}</td>
              <td className="p-4">
                {member.schedule && member.schedule.length > 0 ? (
                  <div className="p-3 bg-gray-100 border border-gray-300 rounded-md">
                    {member.schedule.map((shift, index) => (
                      <div
                        key={`${member._id}-${index}`}
                        className="flex justify-between items-center py-2 px-3 bg-white rounded-md shadow-sm mb-2"
                      >
                        <span className="text-green-600 font-bold">{shift.day}</span>
                        <span className="text-gray-700">
                          {shift.shiftStart} - {shift.shiftEnd}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-500 italic">No schedule available</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
)}
  


      
    </div>
  );
};

export default StaffTable;