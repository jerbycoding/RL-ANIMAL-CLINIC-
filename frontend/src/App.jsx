import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Login";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import PatientManagement from "./pages/PatientManagement";
import PatientForm from "./pages/Components/PatientForm";
import PatientOverview from "./pages/PatientOverview";
import PhysicalExamForm from "./pages/PatientDiagnoticExam";
import Attendance from "./pages/StaffManagement";
import StaffForm from "./pages/Modal/StaffModal";
import AppointmentForm from "./pages/AppointmentForm";
import AppointmentsTable from "./pages/Appointment";
import InventoryTable from "./pages/InventoryTable";
import BillingAndInvoice from "./pages/BillingAndInvoice";
import EditPatientForm from "./pages/Components/EditPatientForm";
import ProtectedRoute from "./pages/Components/ProtectedRoute";
import Clinic from "./pages/Clinic";

const isAuthenticated = () => localStorage.getItem("token") !== null;

const App = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route
          path="clinic"
          element={
            <ProtectedRoute allowedRoles={["veterinary", "admin"]}>
              <Clinic></Clinic>
            </ProtectedRoute>
          }
        />

        {/* Veterinary Access */}
        <Route
          path="PatientManagement"
          element={
            <ProtectedRoute allowedRoles={["veterinary", "admin"]}>
              <PatientManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="PatientForm"
          element={
            <ProtectedRoute allowedRoles={["veterinary", "admin"]}>
              <PatientForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="EditPatientForm/:id"
          element={
            <ProtectedRoute allowedRoles={["veterinary", "admin"]}>
              <EditPatientForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="PatientOverview/:id"
          element={
            <ProtectedRoute allowedRoles={["veterinary", "admin"]}>
              <PatientOverview />
            </ProtectedRoute>
          }
        />
        <Route
          path="CheckUp"
          element={
            <ProtectedRoute allowedRoles={["veterinary", "staff", "admin"]}>
              {" "}
              {/* Assuming staff can also do check-ups */}
              <PhysicalExamForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="Appointments"
          element={
            <ProtectedRoute allowedRoles={["veterinary", "staff", "admin"]}>
              {" "}
              {/* Assuming staff can manage appointments */}
              <AppointmentsTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="AppointmentForm"
          element={
            <ProtectedRoute allowedRoles={["veterinary", "staff", "admin"]}>
              <AppointmentForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="Billing"
          element={
            <ProtectedRoute allowedRoles={["staff", "admin", "admin"]}>
              {" "}
              {/* Assuming staff and admin handle billing */}
              <BillingAndInvoice />
            </ProtectedRoute>
          }
        />

        {/* Admin Access */}
        <Route
          path="StaffManagement"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Attendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="Services"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Services/>
            </ProtectedRoute>
          }
        />
        <Route
          path="StaffForm"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <StaffForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="Inventory"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <InventoryTable />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  </Router>
);

export default App;
