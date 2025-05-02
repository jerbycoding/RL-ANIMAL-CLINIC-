import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AppointmentModal = ({ appointment, onClose, onSave, mode = "view" }) => {
  const [formData, setFormData] = useState({
    patient: appointment.patient.name,
    vet: appointment.vet.name,
    date: appointment.date,
    startTime: appointment.startTime,
    endTime: appointment.endTime,
    purpose: appointment.purpose,
    notes: appointment.notes || ""
  });
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (onSave) onSave(formData);
    navigate('/dashboard/Appointments')
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">
          {mode === "view" ? "View Appointment" : "Edit Appointment"}
        </h2>

        {/* Patient Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Patient Name</label>
          {mode === "view" ? (
            <p className="text-gray-800">{formData.patient}</p>
          ) : (
            <input
              type="text"
              name="patient"
              value={formData.patient}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          )}
        </div>

        {/* Vet Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Veterinarian</label>
          {mode === "view" ? (
            <p className="text-gray-800">{formData.vet}</p>
          ) : (
            <input
              type="text"
              name="vet"
              value={formData.vet}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          )}
        </div>

        {/* Appointment Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Date</label>
          {mode === "view" ? (
            <p className="text-gray-800">{new Date(formData.date).toLocaleDateString()}</p>
          ) : (
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          )}
        </div>

        {/* Start Time */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Start Time</label>
          {mode === "view" ? (
            <p className="text-gray-800">{formData.startTime}</p>
          ) : (
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          )}
        </div>

        {/* End Time */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">End Time</label>
          {mode === "view" ? (
            <p className="text-gray-800">{formData.endTime}</p>
          ) : (
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          )}
        </div>

        {/* Purpose */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Purpose</label>
          {mode === "view" ? (
            <p className="text-gray-800">{formData.purpose}</p>
          ) : (
            <input
              type="text"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          )}
        </div>

        {/* Notes */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          {mode === "view" ? (
            <p className="text-gray-800">{formData.notes || "N/A"}</p>
          ) : (
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            ></textarea>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            Close
          </button>
          {mode === "edit" && (
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;