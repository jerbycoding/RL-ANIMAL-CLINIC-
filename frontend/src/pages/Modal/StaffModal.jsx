import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StaffForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    schedule: [],
    specialization: "",
  });

  const navigate = useNavigate()
  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle adding shift schedule
  const addSchedule = () => {
    setFormData({
      ...formData,
      schedule: [...formData.schedule, { day: "", shiftStart: "", shiftEnd: "" }],
    });
  };

  // Handle schedule updates
  const handleScheduleChange = (index, e) => {
    const updatedSchedule = formData.schedule.map((shift, i) =>
      i === index ? { ...shift, [e.target.name]: e.target.value } : shift
    );
    setFormData({ ...formData, schedule: updatedSchedule });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/staff", formData);

    } catch (error) {
      console.error("Error adding staff:", error);
    
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Add Staff Member</h1>
      <button onClick={()=>{navigate('/dashboard/StaffManagement')}} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Exit</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter staff name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Role Selection */}
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Role</option>
          <option value="Veterinarian">Veterinarian</option>
          <option value="Assistant">Assistant</option>
          <option value="Receptionist">Receptionist</option>
        </select>

        {/* Email Input */}
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Phone Input */}
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="text"
          name="phone"
          placeholder="Enter phone number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />

        {/* Specialization Input */}
        {formData.role === "Veterinarian" && (
          <>
            <label className="block text-sm font-medium text-gray-700">Specialization</label>
            <input
              type="text"
              name="specialization"
              placeholder="E.g., Surgery, Dentistry"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </>
        )}

        {/* Shift Schedule Section */}
        <h3 className="text-lg font-semibold text-gray-800">Shift Schedule</h3>
        {formData.schedule.map((shift, index) => (
          <div key={index} className="grid grid-cols-3 gap-4">
            <select
              name="day"
              value={shift.day}
              onChange={(e) => handleScheduleChange(index, e)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
            <input
              type="time"
              name="shiftStart"
              value={shift.shiftStart}
              onChange={(e) => handleScheduleChange(index, e)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
            <input
              type="time"
              name="shiftEnd"
              value={shift.shiftEnd}
              onChange={(e) => handleScheduleChange(index, e)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addSchedule}
          className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
        >
          + Add Shift
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
        >
          Add Staff Member
        </button>
      </form>
    </div>
  );
};

export default StaffForm;