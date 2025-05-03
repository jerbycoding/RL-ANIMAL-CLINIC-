import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DotLoader } from 'react-spinners';

function QuickStats() {
  const [stats, setStats] = useState({
    todayAppointments: null,
    newPatientsMonth: null,
    revenueWeek: null,
    lowStockItems: null,
    shopRevenueWeek: null, // New state for shop revenue
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuickStats = async () => {
      try {
        setLoading(true);
        const [appointmentsRes, patientsRes, revenueRes, inventoryRes, shopRevenueRes] = await Promise.all([
          axios.get('http://localhost:5000/appointments/today/count'),
          axios.get('http://localhost:5000/patients/new/this-month/count'),
          axios.get('http://localhost:5000/invoices/revenue/this-week'),
          axios.get('http://localhost:5000/inventory/low-stock/count'),
          axios.get('http://localhost:5000/shop/revenue/this-week'), // Fetch shop revenue
        ]);

        setStats({
          todayAppointments: appointmentsRes.data.count,
          newPatientsMonth: patientsRes.data.count,
          revenueWeek: revenueRes.data.totalRevenue,
          lowStockItems: inventoryRes.data.count,
          shopRevenueWeek: shopRevenueRes.data.totalRevenue, // Set shop revenue
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
    return <div className="bg-white dark:bg-gray-800 shadow rounded-md p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center content-center"><DotLoader size={30} /></div>;
  }

  if (error) {
    return <div className="bg-white dark:bg-gray-800 shadow rounded-md p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
    <div className="bg-white dark:bg-gray-700 shadow rounded-md p-4 text-center">
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300 mb-2">Today's Appointments</h3>
      <p className="text-xl font-bold text-blue-500 dark:text-blue-300">{stats.todayAppointments !== null ? stats.todayAppointments : 'N/A'}</p>
    </div>
    <div className="bg-white dark:bg-gray-700 shadow rounded-md p-4 text-center">
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300 mb-2">New Patients (This Month)</h3>
      <p className="text-xl font-bold text-green-500 dark:text-green-300">{stats.newPatientsMonth !== null ? stats.newPatientsMonth : 'N/A'}</p>
    </div>
    <div className="bg-white dark:bg-gray-700 shadow rounded-md p-4 text-center">
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300 mb-2">Revenue (This Week)</h3>
      <p className="text-xl font-bold text-indigo-500 dark:text-indigo-300">${stats.revenueWeek !== null ? parseFloat(stats.revenueWeek).toFixed(2) : 'N/A'}</p>
    </div>
    <div className="bg-white dark:bg-gray-700 shadow rounded-md p-4 text-center">
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300 mb-2">Low Stock Items</h3>
      <p className="text-xl font-bold text-orange-500 dark:text-orange-300">{stats.lowStockItems !== null ? stats.lowStockItems : 'N/A'}</p>
    </div>
    <div className="bg-white dark:bg-gray-700 shadow rounded-md p-4 text-center">
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300 mb-2">Shop Revenue (This Week)</h3>
      <p className="text-xl font-bold text-teal-500 dark:text-teal-300">${stats.shopRevenueWeek !== null ? parseFloat(stats.shopRevenueWeek).toFixed(2) : 'N/A'}</p>
    </div>
  </div>
  );
}

export default QuickStats;