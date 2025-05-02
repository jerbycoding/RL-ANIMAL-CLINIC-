import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DotLoader } from 'react-spinners';

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
    <div className="bg-white dark:bg-gray-800 shadow rounded-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Today's Appointments
      </h2>
      {appointments.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-300">No appointments scheduled for today.</p>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment._id} className="py-2 border-b dark:border-gray-700">
              {appointment.patientName} ({appointment.ownerName || 'N/A'}) - {appointment.purpose}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AppointmentsOverview;