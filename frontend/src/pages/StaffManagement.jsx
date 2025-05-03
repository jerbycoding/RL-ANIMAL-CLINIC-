import React, { useEffect, useState } from "react";
import axios from "axios";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { CiViewTable } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
const StaffTable = () => {
  const [isEditMode, setIsEditMode] = useState(false);
const [formData, setFormData] = useState({
  name: "",
  role: "",
  email: "",
  phone: "",
  specialization: "",
});
  const [staff, setStaff] = useState([]);
  const [activeTab, setActiveTab] = useState("table");
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this staff member?")) return;

    try {
      await axios.delete(`http://localhost:5000/staff/${id}`);
      setStaff(staff.filter((member) => member._id !== id));
      alert("Staff member deleted successfully!");
    } catch (error) {
      console.error("Error deleting staff:", error);
      alert("Failed to delete staff member.");
    }
  };

  const handleEdit = (member) => {
    setSelectedStaff(member);
    setFormData({
      name: member.name || "",
      role: member.role || "",
      email: member.email || "",
      phone: member.phone || "",
      specialization: member.specialization || "",
    });
    setIsEditMode(true);
    setIsModalOpen(true);
    
  };
  
  const handleViewDetails = (member) => {
    setSelectedStaff(member);
    setIsEditMode(false);
    setIsModalOpen(true);
  };
  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/staff/${selectedStaff._id}`,
        formData
      );
      const updatedStaff = staff.map((s) =>
        s._id === selectedStaff._id ? response.data : s
      );
      setStaff(updatedStaff);
      enqueueSnackbar("Update  successfully!", { variant: "success" });
      closeModal();
    } catch (err) {
      console.error("Error updating staff:", err);
      enqueueSnackbar("Error !", { variant: "error" });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStaff(null);
  };

  return (
    <div className="">
      <div className="flex justify-center items-center gap-8  pb-2">
        <div
          className={`cursor-pointer flex flex-col items-center ${
            activeTab === "table" ? "text-blue-500" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("table")}
        >
          <CiViewTable className="text-5xl transition duration-200" />
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
          <RiCalendarScheduleLine className="text-5xl transition duration-200" />
          <div
            className={`h-1 w-20 mt-1 rounded-full transition-all ${
              activeTab === "calendar" ? "bg-blue-500" : "bg-transparent"
            }`}
          ></div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Staff Management</h1>
        <button
          onClick={() => navigate("/dashboard/StaffForm")}
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Add Form
        </button>
      </div>

      {activeTab === "table" ? (
        <table className="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden shadow-md">
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
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="p-4">{member.name}</td>
                <td className="p-4">{member.role}</td>
                <td className="p-4">{member.email}</td>
                <td className="p-4">{member.phone || "N/A"}</td>
                <td className="p-4">{member.specialization || "N/A"}</td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => handleViewDetails(member)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 mr-2"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(member)}
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
        </table>
      ) : (
        <table className="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden shadow-md">
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

{isModalOpen && selectedStaff && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
    <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
      <h2 className="text-xl font-bold mb-4">
        {isEditMode ? "Edit Staff" : `${selectedStaff.name}'s Details`}
      </h2>

      {isEditMode ? (
        <div className="space-y-3">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            placeholder="Name"
            className="w-full p-2 border rounded"
            disabled
          />
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleFormChange}
            placeholder="Role"
            className="w-full p-2 border rounded"
            disabled
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleFormChange}
            placeholder="Phone"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={handleFormChange}
            placeholder="Specialization"
            className="w-full p-2 border rounded"
            disabled
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p><strong>Role:</strong> {selectedStaff.role}</p>
          <p><strong>Email:</strong> {selectedStaff.email}</p>
          <p><strong>Phone:</strong> {selectedStaff.phone || "N/A"}</p>
          <p><strong>Specialization:</strong> {selectedStaff.specialization || "N/A"}</p>
          <button
            onClick={closeModal}
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      )}
    </div>
  </div>
)}

    </div>
  );
};

export default StaffTable;
