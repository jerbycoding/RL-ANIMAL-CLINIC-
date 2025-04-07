import React, { useState } from "react";

const AppointmentDetails = ({ appointment, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">Appointment Details</h2>
        <p><strong>Patient:</strong> {appointment.patient.name}</p>
        <p><strong>Veterinarian:</strong> {appointment.vet.name}</p>
        <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
        <p><strong>Time:</strong> {appointment.startTime} - {appointment.endTime}</p>
        <p><strong>Purpose:</strong> {appointment.purpose}</p>
        <p><strong>Status:</strong> 
          <span
            className={`font-semibold ${
              appointment.status === "Scheduled" ? "text-green-600" :
              appointment.status === "Completed" ? "text-blue-600" : "text-red-600"
            }`}
          >
            {appointment.status}
          </span>
        </p>
        {appointment.status === "Cancelled" && appointment.cancellationReason && (
          <p><strong>Cancellation Reason:</strong> {appointment.cancellationReason}</p>
        )}
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};
export default AppointmentDetails;