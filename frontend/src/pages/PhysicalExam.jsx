import React, { useState, useEffect } from "react";
import axios from "axios";
import { DotLoader } from "react-spinners";
import { useSnackbar } from "notistack";
const PhysicalExamForm = () => {
  const initialFormData = {
    patient: "",
    description: "",
    weight: "",
    temperature: "",
    respiration: "",
    pulse: "",
    generalCondition: "N",
    generalAttitude: "N",
    hydration: "N",
    mucous: "N",
    headNeck: "N",
    eyes: "N",
    ears: "N",
    gastrointestinal: "N",
    urogenitals: "N",
    respiratory: "N",
    circulatory: "N",
    musculoskeletal: "N",
    lymphNodes: "N",
    venousReturn: "N",
    integumentarySkin: "N",
  };
  const { enqueueSnackbar } = useSnackbar();
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(initialFormData);

  const options = ["N", "AB", "NE"];

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/patients");
        setPatients(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching patients", err);
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setDropdownVisible(true);
  };
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleSelectPatient = (patient) => {
    setSearchQuery(patient.name);
    setFormData({ ...formData, patient: patient._id });
    setDropdownVisible(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentDate = new Date().toISOString().split("T")[0];
  
    try {
      await axios.post("http://localhost:5000/exams", {
        ...formData,
        testDate: currentDate,
      });
      enqueueSnackbar("Test submitted successfully!", { variant: "success" });
  
      // Reset form
      setFormData(initialFormData);
      setSearchQuery("");
      setDropdownVisible(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      enqueueSnackbar("Failed to submit the test.", { variant: "error" });
    }
  };
  
  const renderSelect = (label, name) => (
    <div className="mb-2">
      <label className="block font-medium">{label}</label>
      <select
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
  if (loading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <DotLoader size={40} />
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">Physical Exam</h2>

      {/* Patient Search */}
      <div className="relative">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Search Patient
        </label>
        <input
          type="text"
          placeholder="Type a patient name..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {searchQuery && dropdownVisible && (
          <ul className="absolute z-10 left-0 right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <li
                  key={patient._id}
                  onClick={() => handleSelectPatient(patient)}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white transition-colors"
                >
                  {patient.name} - {patient.owner?.name}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No patients found.</li>
            )}
          </ul>
        )}
      </div>

      {/* Basic Vitals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-lg shadow-md border">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Abnormal Description
          </label>
          <input
            name="description"
            placeholder="Abnormal findings..."
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Weight (kg)
          </label>
          <input
            name="weight"
            type="number"
            placeholder="Weight"
            value={formData.weight}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Temperature (°C)
          </label>
          <input
            name="temperature"
            type="number"
            placeholder="Temperature"
            value={formData.temperature}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Respiration
          </label>
          <input
            name="respiration"
            type="number"
            placeholder="Respiration"
            value={formData.respiration}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pulse
          </label>
          <input
            name="pulse"
            type="number"
            placeholder="Pulse"
            value={formData.pulse}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <hr className="my-4 border-t border-gray-300" />

      {/* Physical Exam Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-lg shadow-md border">
        {renderSelect("General Condition", "generalCondition")}
        {renderSelect("General Attitude", "generalAttitude")}
        {renderSelect("Hydration", "hydration")}
        {renderSelect("Mucous", "mucous")}
        {renderSelect("Head & Neck", "headNeck")}
        {renderSelect("Eyes", "eyes")}
        {renderSelect("Ears", "ears")}
        {renderSelect("Gastrointestinal", "gastrointestinal")}
        {renderSelect("Urogenitals", "urogenitals")}
        {renderSelect("Respiratory", "respiratory")}
        {renderSelect("Circulatory", "circulatory")}
        {renderSelect("Musculoskeletal", "musculoskeletal")}
        {renderSelect("Lymph Nodes", "lymphNodes")}
        {renderSelect("Venous Return", "venousReturn")}
        {renderSelect("Integumentary (Skin)", "integumentarySkin")}
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Submit Exam
        </button>
      </div>
    </form>
  );
};

export default PhysicalExamForm;
