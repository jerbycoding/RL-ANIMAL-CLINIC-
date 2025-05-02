import React from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from './Components/Topbar';
import Sidebar from './Components/Sidebar';



function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 "   >
      {/* Topbar */}
      <Topbar />

      {/* Main Content Area with Sidebar */}
      <div className="flex flex-1  object-fit w-50 h-2" >
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          {/* The content of the specific dashboard route will be rendered here */}
          <Outlet />

          {/* Optional Footer */}
          {/* <Footer /> */}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;