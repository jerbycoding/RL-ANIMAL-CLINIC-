import Topbar from "./Components/Topbar";
import Sidebar from "./Components/Sidebar";
import {Routes, Route} from 'react-router-dom'
// 
import PatientManagement from "./PatientManagement";

import ContinousCalendar from './Appointment'
import InventoryTable from "./InventoryTable";
import StaffManagement from "./StaffManagement";
import POSBilling from "./Billing";
export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-[100vh] bg-gray-100 dark:bg-gray-900">
      <Topbar />
      <div className="flex flex-1 ">
        <Sidebar />
        <main className="m-5 flex-1 min-h-full">        
          <Routes>
            <Route path="/PatientManagement" element={<PatientManagement></PatientManagement>}></Route>
            <Route path="/Appointments" element={<ContinousCalendar ></ContinousCalendar>}></Route>
            <Route path="/Inventory" element={<InventoryTable></InventoryTable>}></Route>
            <Route path="/StaffManagement" element={<StaffManagement></StaffManagement>}></Route>
            <Route path="/Billing" element={<POSBilling></POSBilling>}></Route>
          </Routes>
        </main>
      </div>
    </div>
  );
}
