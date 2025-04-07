import React, { useState, useEffect } from "react";
import axios from "axios";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    patient: "",
    vet: "",
    date: "",
    startTime: "",
    endTime: "",
    purpose: "",
    notes: ""
  });
  const [patients, setPatients] = useState([]);
  const [vets, setVets] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch Patients and Veterinarians
  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientResponse = await axios.get("http://localhost:5000/patients");
        const vetResponse = await axios.get("http://localhost:5000/staff");
        setPatients(patientResponse.data);
        setVets(vetResponse.data.filter((staff) => staff.role === "Veterinarian")); // Filter vets only
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/appointments", formData);
      setMessage("Appointment created successfully!");
      setFormData({
        patient: "",
        vet: "",
        date: "",
        startTime: "",
        endTime: "",
        purpose: "",
        notes: ""
      }); // Reset form
    } catch (error) {
      console.error("Error creating appointment:", error);
      setMessage("Failed to create appointment. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Create Appointment</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Display Response Message */}
        {message && (
          <div
            className={`p-3 rounded-md ${
              message.includes("success") ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
            }`}
          >
            {message}
          </div>
        )}

        {/* Patient Dropdown */}
        <label className="block text-sm font-medium text-gray-700">Select Patient</label>
        <select
          name="patient"
          value={formData.patient}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Choose Patient</option>
          {patients.map((patient) => (
            <option key={patient._id} value={patient._id}>
              {patient.name}
            </option>
          ))}
        </select>

        {/* Veterinarian Dropdown */}
        <label className="block text-sm font-medium text-gray-700">Select Veterinarian</label>
        <select
          name="vet"
          value={formData.vet}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Choose Veterinarian</option>
          {vets.map((vet) => (
            <option key={vet._id} value={vet._id}>
              {vet.name}
            </option>
          ))}
        </select>

        {/* Appointment Date */}
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Start Time */}
        <label className="block text-sm font-medium text-gray-700">Start Time</label>
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* End Time */}
        <label className="block text-sm font-medium text-gray-700">End Time</label>
        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Purpose */}
        <label className="block text-sm font-medium text-gray-700">Purpose</label>
        <input
          type="text"
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
          placeholder="E.g., Check-up, Vaccination"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Notes */}
        <label className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Any additional information..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
        >
          Submit Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;