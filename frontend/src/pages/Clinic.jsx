import React from 'react';
import WelcomeBanner from './WelcomeBanner';
import QuickStats from './QuickStats';
import QuickAction from './QuickAction';
import AppointmentsOverview from './AppointmentsOverview';
import PatientInsights from './PatientInsights';
// import BillingSummary from './BillingSummary';
// import InventoryStatus from './InventoryStatus';
// import QuickActions from './QuickActions';
// import Notifications from './Notifications';

function Clinic() {
  return (
    <div className="  dark:bg-gray-900 min-h-screen">
    <WelcomeBanner />
    <QuickStats />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      <div className="md:col-span-2">
          <AppointmentsOverview />
      </div>

      <div>
        <QuickAction></QuickAction>        
      </div>
      
      <div>
    <PatientInsights/>
      </div>

    </div>
    </div>
  );
}

export default Clinic;