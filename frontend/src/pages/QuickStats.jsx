import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DotLoader } from 'react-spinners';

function QuickStats() {
  const [stats, setStats] = useState({
    todayAppointments: null,
    newPatientsMonth: null,
    revenueWeek: null,
    lowStockItems: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuickStats = async () => {
      try {
        setLoading(true);
        const [appointmentsRes, patientsRes, revenueRes, inventoryRes] = await Promise.all([
          axios.get('http://localhost:5000/appointments/today/count'), // Use your actual API path
          axios.get('http://localhost:5000/patients/new/this-month/count'), // Use your actual API path
          axios.get('http://localhost:5000/invoices/revenue/this-week'), // Use your actual API path
          axios.get('http://localhost:5000/inventory/low-stock/count'), // Use your actual API path
        ]);

        setStats({
          todayAppointments: appointmentsRes.data.count,
          newPatientsMonth: patientsRes.data.count,
          revenueWeek: revenueRes.data.totalRevenue,
          lowStockItems: inventoryRes.data.count,
        });
        setLoading(false);
      } catch (err) {
        setError('Error fetching quick stats');
        console.error(err);
        setLoading(false);
      }
    };

    fetchQuickStats();
  }, []);

  if (loading) {
    return <div className="bg-white dark:bg-gray-800 shadow rounded-md p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center content-center"><DotLoader size={30} /></div>;
  }
  console.log(stats.newPatientsMonth);
  if (error) {
    return <div className="bg-white dark:bg-gray-800 shadow rounded-md p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-md p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Today's Appointments</h3>
        <p className="text-2xl font-bold text-blue-500">{stats.todayAppointments !== null ? stats.todayAppointments : 'N/A'}</p>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">New Patients (This Month)</h3>
        <p className="text-2xl font-bold text-green-500">{stats.newPatientsMonth !== null ? stats.newPatientsMonth : 'N/A'}</p>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Revenue (This Week)</h3>
        <p className="text-2xl font-bold text-indigo-500">${stats.revenueWeek !== null ? parseFloat(stats.revenueWeek).toFixed(2) : 'N/A'}</p>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Low Stock Items</h3>
        <p className="text-2xl font-bold text-orange-500">{stats.lowStockItems !== null ? stats.lowStockItems : 'N/A'}</p>
      </div>
    </div>
  );
}

export default QuickStats;