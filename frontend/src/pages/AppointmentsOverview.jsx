import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DotLoader } from 'react-spinners';
import { FaUser, FaPaw, FaCalendarCheck } from 'react-icons/fa';
function AppointmentsOverview() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodayAppointments = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/appointments/today/details');
        setAppointments(res.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching today\'s appointments');
        console.error(err);
        setLoading(false);
      }
    };

    fetchTodayAppointments();
  }, []);
  console.log(appointments);

  if (loading) {
    return <div className="bg-white dark:bg-gray-800 shadow rounded-md p-6"><DotLoader size={20} /> Loading Appointments...</div>;
  }

  if (error) {
    return <div className="bg-white dark:bg-gray-800 shadow rounded-md p-6 text-red-500">{error}</div>;
  }

  return (
<div className="bg-white dark:bg-gray-700 shadow rounded-md p-6" style={{ maxHeight: '400px', overflowY: 'auto' }}>
  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
    <FaCalendarCheck className="mr-2 text-blue-500 dark:text-blue-300" />
    Today's Appointments
  </h2>
  {appointments.length === 0 ? (
    <p className="text-gray-700 dark:text-gray-300">No appointments scheduled for today.</p>
  ) : (
    <ul className="space-y-3">
      {appointments.map((appointment) => (
        <li key={appointment._id} className="bg-gray-50 dark:bg-gray-800 rounded-md p-3">
          <div className="flex items-center">
            <FaPaw className="mr-2 text-green-500 dark:text-green-300" />
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">{appointment.patientName}</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 ml-6 flex items-center">
            <FaUser className="mr-1 text-indigo-500 dark:text-indigo-300" />
            Owner: {appointment.ownerName || 'N/A'}
          </p>
          <p className="text-blue-500 dark:text-blue-300 text-sm mt-1 ml-6">{appointment.purpose}</p>
          {/* You could add more icons or small buttons here for actions */}
        </li>
      ))}
    </ul>
  )}
</div>
  );
}

export default AppointmentsOverview;