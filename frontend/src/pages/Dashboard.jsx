import Topbar from "./Components/Topbar";
import Sidebar from "./Components/Sidebar";
import {Routes, Route} from 'react-router-dom'
// 
import PatientManagement from "./PatientManagement";
import PatientForm from "./Components/PatientForm";

import PatientOverview from "./PatientOverview";
import PhysicalExamForm from "./PatientDiagnoticExam";
import CalendarApp from "./Appointment";
import Attendance from "./StaffManagement";
import StaffForm from "./Modal/StaffModal";
import AppointmentForm from "./AppointmentForm";
import AppointmentsTable from "./Appointment";

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-[100vh] bg-gray-100 dark:bg-gray-900">
      <Topbar />
      <div className="flex flex-1 ">
        <Sidebar />
        <main className="m-5 flex-1 min-h-full">        
          <Routes>
            <Route path="/PatientManagement" element={<PatientManagement></PatientManagement>}></Route>
            <Route path="/PatientForm" element={<PatientForm></PatientForm>}></Route>
            <Route path="/PatientOverview/:id" element={<PatientOverview></PatientOverview>}></Route>
            <Route path="/CheckUp" element={<PhysicalExamForm></PhysicalExamForm>}></Route>
            <Route path="/StaffManagement" element={<Attendance></Attendance>}></Route>
            <Route path="/StaffForm" element={<StaffForm></StaffForm>}></Route>
            <Route path="/Appointments" element={<AppointmentsTable/>}></Route>
            <Route path="/AppointmentForm" element={<AppointmentForm></AppointmentForm>}></Route>



















































            {/* <Route path="/Appointments" element={<ContinousCalendar ></ContinousCalendar>}></Route>
            <Route path="/Inventory" element={<InventoryTable></InventoryTable>}></Route>
            <Route path="/StaffManagement" element={<StaffManagement></StaffManagement>}></Route>
            <Route path="/Billing" element={<POSBilling></POSBilling>}></Route>
            <Route path="/Reports" element={<ReportsLogs></ReportsLogs>}></Route> */}
          </Routes>
        </main>
      </div>
    </div>
  );
}
