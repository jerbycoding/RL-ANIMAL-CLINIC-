import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

const PhysicalExamForm = () => {
    const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    patient: "", 
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
  });
  const [vitalSigns, setVitalSigns] = useState({
    patient: "",
    description: "",
    weight: 0,
    temperature: 0,
    respiration: 0,
    pulse: 0,
  });

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setDropdownVisible(true);
  };

  console.log(vitalSigns);
  // Fetch the list of patients when the component mounts
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get("http://localhost:5000/patients");
        setPatients(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching patients:", err);
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleChangeVital = (e) => {
    const { name, value } = e.target;
    setVitalSigns({ ...vitalSigns, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/physical-exams",
        formData
      );
      console.log("Exam created:", response.data);
      enqueueSnackbar("Successfully", { variant: "success" });
    } catch (err) {
      console.error("Error creating exam:", err);
      enqueueSnackbar("Failed", { variant: "error" });
    }
  };
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Loading state while fetching patients
  if (loading) {
    return <p>Loading patients...</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Physical Exam Form
      </h2>

      {/* Patient Dropdown */}
      <div className="mb-4 relative">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Search Patient
        </label>
        {/* Search Input */}
        <input
          type="text"
          placeholder="Type a patient name..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Dropdown Results */}
        {searchQuery && dropdownVisible && (
          <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {filteredPatients.map((patient) => (
              <li
                key={patient._id}
                onClick={() => {
                  setSearchQuery(patient.name);
                  setFormData({ ...formData, patient: patient._id });
                  setVitalSigns({ ...vitalSigns, patient: patient._id });
                  setDropdownVisible(false);
                }}
                className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white transition-colors"
              >
                {patient.name} - {patient.owner.name}
              </li>
            ))}
            {filteredPatients.length === 0 && (
              <li className="px-4 py-2 text-gray-500">No patients found.</li>
            )}
          </ul>
        )}
      </div>
        

      <div className="mb-4 grid grid-cols-2 gap-4">
  {/* Weight Field */}
  <div>
    <label className="block text-sm font-medium text-gray-700">Weight</label>
    <input
      name="weight"
      type="number"
      onChange={handleChangeVital}
      value={vitalSigns.weight}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Temperature Field */}
  <div>
    <label className="block text-sm font-medium text-gray-700">Temperature</label>
    <input
      name="temperature"
      type="number"
      onChange={handleChangeVital}
      value={vitalSigns.temperature}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Respiration Field */}
  <div>
    <label className="block text-sm font-medium text-gray-700">Respiration</label>
    <input
      name="respiration" 
      type="number"
      onChange={handleChangeVital}
      value={vitalSigns.respiration}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Pulse Field */}
  <div>
    <label className="block text-sm font-medium text-gray-700">Pulse</label>
    <input
      name="pulse"
      type="number"
      onChange={handleChangeVital}
      value={vitalSigns.pulse}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Description Field */}
  <div className="col-span-2"> {/* Takes full width */}
    <label className="block text-sm font-medium text-gray-700">Description</label>
    <textarea
      name="description" 
      onChange={handleChangeVital}
      value={vitalSigns.description}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
</div>
      <div className="grid grid-cols-2 grid-flow-row gap-2">
      {/* Other fields like general condition, general attitude, etc. */}
      <div className="mb-4">
        <label className="block text-gray-700">General Condition</label>
        <select
          name="generalCondition"
          value={formData.generalCondition}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        >
          <option value="N">Normal</option>
          <option value="AB">Abnormal</option>
          <option value="NE">Not Evaluated</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">General Attitude</label>
        <select
          name="generalAttitude"
          value={formData.generalAttitude}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        >
          <option value="N">Normal</option>
          <option value="AB">Abnormal</option>
          <option value="NE">Not Evaluated</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Hydration</label>
        <select
          name="hydration"
          value={formData.hydration}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        >
          <option value="N">Normal</option>
          <option value="AB">Abnormal</option>
          <option value="NE">Not Evaluated</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Mucous</label>
        <select
          name="mucous"
          value={formData.mucous}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        >
          <option value="N">Normal</option>
          <option value="AB">Abnormal</option>
          <option value="NE">Not Evaluated</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Head/Neck</label>
        <select
          name="headNeck"
          value={formData.headNeck}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        >
          <option value="N">Normal</option>
          <option value="AB">Abnormal</option>
          <option value="NE">Not Evaluated</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">EYES </label>
        <select
          name="eyes"
          value={formData.eyes}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        >
          <option value="N">Normal</option>
          <option value="AB">Abnormal</option>
          <option value="NE">Not Evaluated</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">EARS</label>
        <select
          name="ears"
          value={formData.ears}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        >
          <option value="N">Normal</option>
          <option value="AB">Abnormal</option>
          <option value="NE">Not Evaluated</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">GASTROINTESTINAL</label>
        <select
          name="gastrointestinal"
          value={formData.gastrointestinal}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        >
          <option value="N">Normal</option>
          <option value="AB">Abnormal</option>
          <option value="NE">Not Evaluated</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">UROGENITALS </label>
        <select
          name="urogenitals"
          value={formData.urogenitals}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        >
          <option value="N">Normal</option>
          <option value="AB">Abnormal</option>
          <option value="NE">Not Evaluated</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Respiratory</label>
        <select
          name="respiratory"
          value={formData.respiratory}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        >
          <option value="N">Normal</option>
          <option value="AB">Abnormal</option>
          <option value="NE">Not Evaluated</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">CIRCULATORY </label>
        <select
          name="circulatory"
          value={formData.circulatory}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        >
          <option value="N">Normal</option>
          <option value="AB">Abnormal</option>
          <option value="NE">Not Evaluated</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">MUSCUCOSKELETO </label>
        <select
          name="musculoskeletal"
          value={formData.musculoskeletal}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        >
          <option value="N">Normal</option>
          <option value="AB">Abnormal</option>
          <option value="NE">Not Evaluated</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">LYMPH NODES </label>
        <select
          name="lymphNodes"
          value={formData.lymphNodes}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        >
          <option value="N">Normal</option>
          <option value="AB">Abnormal</option>
          <option value="NE">Not Evaluated</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">VENOUS RETURN</label>
        <select
          name="venousReturn"
          value={formData.venousReturn}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        >
          <option value="N">Normal</option>
          <option value="AB">Abnormal</option>
          <option value="NE">Not Evaluated</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">INTEGUMENTARY/SKIN</label>
        <select
          name="integumentarySkin"
          value={formData.integumentarySkin}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        >
          <option value="N">Normal</option>
          <option value="AB">Abnormal</option>
          <option value="NE">Not Evaluated</option>
        </select>
      </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md mt-4"
      >
        Submit Physical Exam
      </button>
    </form>
  );
};

export default PhysicalExamForm;
