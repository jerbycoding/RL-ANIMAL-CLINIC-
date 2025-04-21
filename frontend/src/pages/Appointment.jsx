import React, { useEffect, useState } from "react";
import axios from "axios";
import EditStatusModal from "./Modal/EditAppointment";
import AppointmentModal from "./Modal/AppointmentModal";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { DotLoader } from "react-spinners";
import { GrOverview } from "react-icons/gr";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
const AppointmentsTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [modalMode, setModalMode] = useState(null); // "view" or "edit"
  const [filterDate, setFilterDate] = useState("");
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/appointments");
        setAppointments(response.data);
        setLoading(false);
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
      enqueueSnackbar("Appointment deleted successfully!", {
        variant: "success",
      });
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

      enqueueSnackbar("Appointment status updated successfully!", {
        variant: "success",
      });
      navigate("/Appointments");
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
      (appointment.patient?.name || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (appointment.vet?.name || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesDate = filterDate
      ? new Date(appointment.date).toLocaleDateString() ===
        new Date(filterDate).toLocaleDateString()
      : true; // If filterDate is empty, allow all dates

    const matchesStatus = filterStatus
      ? appointment.status === filterStatus
      : true;

    return matchesSearch && matchesDate && matchesStatus;
  });
  if (loading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <DotLoader size={40} />
        <h1>Loading...</h1>
      </div>
    );
  }
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
      <div className="mt-5">
  <div className="relative shadow-md sm:rounded-lg h-[650px] overflow-auto">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-green-100 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
        <tr>
          <th className="px-6 py-3 text-center">Patient</th>
          <th className="px-6 py-3 text-center">Veterinarian</th>
          <th className="px-6 py-3 text-center">Date</th>
          <th className="px-6 py-3 text-center">Time</th>
          <th className="px-6 py-3 text-center">Purpose</th>
          <th className="px-6 py-3 text-center">Status</th>
          <th className="px-6 py-3 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredAppointments.map((appointment) => (
          <tr
            key={appointment._id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
          >
            <td className="px-6 py-4 text-center">
              {appointment.patient?.name || (
                <span className="italic text-gray-400">Unknown</span>
              )}
            </td>
            <td className="px-6 py-4 text-center">
              {appointment.vet?.name || (
                <span className="italic text-gray-400">Unknown</span>
              )}
            </td>
            <td className="px-6 py-4 text-center">
              {new Date(appointment.date).toLocaleDateString()}
            </td>
            <td className="px-6 py-4 text-center">
              {appointment.startTime} - {appointment.endTime}
            </td>
            <td className="px-6 py-4 text-center">{appointment.purpose}</td>
            <td
              className={`px-6 py-4 text-center font-semibold ${
                appointment.status === "Scheduled"
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {appointment.status}
            </td>
            <td className="px-6 py-4 text-center flex items-center justify-center gap-x-5">
              <GrOverview
                className="text-2xl cursor-pointer"
                onClick={() => handleViewDetails(appointment)}
              />
              <CiEdit
                className="text-2xl cursor-pointer"
                onClick={() => handleEditDetails(appointment)}
              />
              <MdDeleteOutline
                className="text-2xl cursor-pointer text-red-600"
                onClick={() => handleDelete(appointment._id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>



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
