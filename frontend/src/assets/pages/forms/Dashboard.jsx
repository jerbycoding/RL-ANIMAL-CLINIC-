import Topbar from "./Components/Topbar";
import Sidebar from "./Components/Sidebar";
import {Routes, Route} from 'react-router-dom'
import PatientTable from "./Patienttable";
import AppointmentBooking from "./Appointment";
import InventoryTable from "./InventoryTable";
import StaffManagement from "./StaffManagement";
import BillingDashboard from "./Billing";
import VetClinicDashboard from "./Reports";
export default function Dashboard() {
  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <Topbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 h-full ">
        
          <Routes>
              <Route path="/PatientTable" element={<PatientTable></PatientTable>}></Route>
              <Route path="/" element={<h1 className="text-red-500 text-2xl">404 - Page Not Found</h1>} />
              <Route path="/Appointment" element={<AppointmentBooking></AppointmentBooking>}></Route>
              <Route path="/Inventory" element={<InventoryTable></InventoryTable>}></Route>
              <Route path="/StaffManagement" element={<StaffManagement></StaffManagement>}></Route>
              <Route path="/Billing" element={<BillingDashboard></BillingDashboard>}></Route>
              <Route path="/Reports" element={<VetClinicDashboard></VetClinicDashboard>}></Route>
          </Routes>
        
        </main>
      </div>
    </div>
  );
}
