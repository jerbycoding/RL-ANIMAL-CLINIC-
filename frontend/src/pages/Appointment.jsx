import React, { useEffect, useState } from "react";
import axios from "axios";
import EditStatusModal from "./Modal/EditAppointment";
import AppointmentModal from "./Modal/AppointmentModal";
import { useNavigate } from "react-router-dom";

const AppointmentsTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [modalMode, setModalMode] = useState(null); // "view" or "edit"
  const [filterDate, setFilterDate] = useState("");

  const navigate = useNavigate();

  // Fetch all appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/appointments");
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/appointments/${id}`);
      setAppointments(
        appointments.filter((appointment) => appointment._id !== id)
      );
      alert("Appointment deleted successfully!");
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("Failed to delete appointment.");
    }
  };

  // Handle saving status update
  const handleSaveStatus = async (newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/appointments/${selectedAppointment._id}/status`,
        {
          status: newStatus,
        }
      );

      // Update the appointment in the state
      setAppointments(
        appointments.map((appt) =>
          appt._id === selectedAppointment._id
            ? { ...appt, status: newStatus }
            : appt
        )
      );

      alert("Appointment status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update appointment status.");
    } finally {
      setSelectedAppointment(null); // Close modal
      setModalMode(null);
    }
  };

  // Handle opening the "View Details" modal
  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setModalMode("view");
  };

  // Handle opening the "Edit Status" modal
  const handleEditDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setModalMode("edit");
  };

  // Filter appointments based on search query and status filter
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patient.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      appointment.vet.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDate = filterDate
      ? new Date(appointment.date).toLocaleDateString() ===
        new Date(filterDate).toLocaleDateString()
      : true; // If filterDate is empty, allow all dates

    const matchesStatus = filterStatus
      ? appointment.status === filterStatus
      : true;

    return matchesSearch && matchesDate && matchesStatus;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Manage Appointments
      </h1>

      {/* Search & Filter Section */}
      <div className="flex  items-center justify-between mb-3">
        <input
          type="text"
          placeholder="Search by patient or vet..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/3 p-2  border border-gray-300 rounded-lg"
        />
        <div>

          <div className="flex gap-3 items-center  ">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="  border-gray-300 rounded-lg p-3"
          >
            <option value="">All Statuses</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <div className="flex items-center">
          <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className=" border-gray-300  p-2.5 rounded-tl-md rounded-bl-md"
            />
            <button
              onClick={() => setFilterDate("")}
              className="bg-gray-500 text-white  hover:bg-gray-600   p-2.5 w-full rounded-tr-md rounded-br-md"
            >
              Reset
            </button>
       
          </div>
      

          <button
            onClick={() => {
              navigate("/AppointmentForm");
            }}
            className="text-white p-3 bg-blue-500 rounded-md"
          >
            Add 
          </button>
          </div>
        </div>
      </div>

      {/* Appointments Table */}
      <table className="w-full table-auto border-collapse border border-gray-200 rounded-lg overflow-hidden shadow-md">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="p-4 text-left">Patient</th>
            <th className="p-4 text-left">Veterinarian</th>
            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-left">Time</th>
            <th className="p-4 text-left">Purpose</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map((appointment, index) => (
            <tr
              key={appointment._id}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="p-4">{appointment.patient.name}</td>
              <td className="p-4">{appointment.vet.name}</td>
              <td className="p-4">
                {new Date(appointment.date).toLocaleDateString()}
              </td>
              <td className="p-4">
                {appointment.startTime} - {appointment.endTime}
              </td>
              <td className="p-4">{appointment.purpose}</td>
              <td
                className={`p-4 font-semibold ${
                  appointment.status === "Scheduled"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {appointment.status}
              </td>
              <td className="p-4 text-center">
                {/* Action Buttons */}
                <button
                  onClick={() => handleViewDetails(appointment)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                >
                  View
                </button>
                <button
                  onClick={() => handleEditDetails(appointment)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(appointment._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render Modals */}
      {modalMode === "edit" && selectedAppointment && (
        <EditStatusModal
          appointment={selectedAppointment}
          onClose={() => {
            setSelectedAppointment(null);
            setModalMode(null);
          }}
          onSave={handleSaveStatus}
        />
      )}

      {modalMode === "view" && selectedAppointment && (
        <AppointmentModal
          appointment={selectedAppointment}
          onClose={() => {
            setSelectedAppointment(null);
            setModalMode(null);
          }}
        />
      )}
    </div>
  );
};

export default AppointmentsTable;
