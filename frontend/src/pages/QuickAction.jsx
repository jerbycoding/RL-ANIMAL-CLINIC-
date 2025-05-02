import React from 'react';
import { useNavigate } from 'react-router-dom';

function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Quick Actions
      </h2>
      <div className="flex gap-4">
        <button
          onClick={() => navigate('/dashboard/PatientForm')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Patient
        </button>
        <button
          onClick={() => navigate('/dashboard/AppointmentForm')}
          className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Schedule Appointment
        </button>
        <button
          onClick={() => navigate('/dashboard/Billing')}
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Invoice
        </button>
        {/* Add more quick action buttons as needed */}
      </div>
    </div>
  );
}

export default QuickActions;