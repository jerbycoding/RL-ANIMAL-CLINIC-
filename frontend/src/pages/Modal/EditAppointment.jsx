import React, { useState } from "react";

const EditStatusModal = ({ appointment, onClose, onSave }) => {
  const [newStatus, setNewStatus] = useState(appointment.status);

  const handleSave = () => {
    onSave(newStatus); // Call the onSave callback with the updated status
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Edit Appointment Status</h2>

        {/* Current Status */}
        <p className="mb-4">
          <strong>Current Status:</strong> 
          <span
            className={`ml-2 font-semibold ${
              appointment.status === "Scheduled"
                ? "text-green-600"
                : appointment.status === "Completed"
                ? "text-blue-600"
                : "text-red-600"
            }`}
          >
            {appointment.status}
          </span>
        </p>

        {/* Status Dropdown */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          New Status
        </label>
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStatusModal;