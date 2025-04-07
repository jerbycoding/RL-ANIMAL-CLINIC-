import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
const TestForm = () => {
  const {enqueueSnackbar} = useSnackbar();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    patient: "",
    bloodTest: { hemoglobin: "", rbcCount: "", wbcCount: "", plateletCount: "", glucose: "" },
    distemperTest: "",
    earSwabTest: { infection: false, bacteriaPresent: false },
    ehrlichiaTest: "",
    heartwormTest: "",
    parvoTest: "",
    skinScraping: { mitesDetected: false, fungalInfection: false },
    stoolExam: { parasitesPresent: false, bacteriaPresent: false, bloodInStool: false },
    ultrasoundFindings: "",
    urineExam: { phLevel: "", proteinInUrine: false, bacteriaPresent: false },
    vaginalSmear: { bacterialInfection: false, yeastInfection: false },
    xRayFindings: "",
    vaccinations: {
      kennelCough: false,
      kennelCoughDate: "",
      mycoplasmaVaccine: false,
      mycoplasmaVaccineDate: "",
    },
    dentalProphylaxis: { done: false, notes: "" },
  });

  // Fetch patients
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:5000/patients/");
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setDropdownVisible(true);
  };

  // Filter patients
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle patient selection
  const handleSelectPatient = (patient) => {
    setSearchQuery(patient.name);
    setFormData({ ...formData, patient: patient._id });
    setDropdownVisible(false);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const keys = name.split(".");
    if (keys.length === 1) {
      setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    } else {
      const [key, subKey] = keys;
      setFormData({
        ...formData,
        [key]: { ...formData[key], [subKey]: type === "checkbox" ? checked : value },
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentDate = new Date().toISOString().split("T")[0];

    try {
      await axios.post("http://localhost:5000/tests", { ...formData, testDate: currentDate });
      enqueueSnackbar("Successfully" , {variant: "success"});
    } catch (error) {
      console.error("Error submitting form:", error);
      enqueueSnackbar("Error" , {variant: "error"});
    }
  };



  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Complete Test Form</h1>

      {/* Patient Section */}
      <div className="mb-4 relative">
        <label className="block text-gray-700 text-sm font-bold mb-2">Search Patient</label>
        <input
          type="text"
          placeholder="Type a patient name..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {searchQuery && dropdownVisible && (
          <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {filteredPatients.map((patient) => (
              <li
                key={patient._id}
                onClick={() => handleSelectPatient(patient)}
                className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white transition-colors"
              >
                {patient.name} - {patient.owner?.name}
              </li>
            ))}
            {filteredPatients.length === 0 && (
              <li className="px-4 py-2 text-gray-500">No patients found.</li>
            )}
          </ul>
        )}
      </div>







      {/* Blood Test Section */}
      <h3 className="text-lg font-semibold text-gray-800">Blood Test</h3>
      {Object.keys(formData.bloodTest).map((key) => (
        <label key={key} className="block text-sm font-medium text-gray-700">
          {key.replace(/([A-Z])/g, " $1").trim()}
          <input
            type="number"
            name={`bloodTest.${key}`}
            value={formData.bloodTest[key]}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
      ))}

      {/* Infection Tests Section */}
      <h3 className="text-lg font-semibold text-gray-800">Infection Tests</h3>
      {["distemperTest", "ehrlichiaTest", "heartwormTest", "parvoTest"].map((key) => (
        <label key={key} className="block text-sm font-medium text-gray-700">
          {key.replace(/([A-Z])/g, " $1").trim()}
          <select
            name={key}
            value={formData[key]}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select</option>
            <option value="Positive">Positive</option>
            <option value="Negative">Negative</option>
          </select>
        </label>
      ))}

      {/* Boolean Fields Section */}
      <h3 className="text-lg font-semibold text-gray-800">Boolean Findings</h3>
<div className="grid grid-cols-2 gap-4">
  {/* Ear Swab Test */}
  <div>
    <label className="flex items-center justify-between bg-gray-100 px-4 py-3 border border-gray-300 rounded-lg">
      <span className="text-gray-700">Ear Swab - Infection</span>
      <input
        type="checkbox"
        name="earSwabTest.infection"
        checked={formData.earSwabTest.infection}
        onChange={handleChange}
        className="h-6 w-6 text-blue-500 focus:ring focus:ring-blue-400 rounded"
      />
    </label>
  </div>
  <div>
    <label className="flex items-center justify-between bg-gray-100 px-4 py-3 border border-gray-300 rounded-lg">
      <span className="text-gray-700">Ear Swab - Bacteria Present</span>
      <input
        type="checkbox"
        name="earSwabTest.bacteriaPresent"
        checked={formData.earSwabTest.bacteriaPresent}
        onChange={handleChange}
        className="h-6 w-6 text-blue-500 focus:ring focus:ring-blue-400 rounded"
      />
    </label>
  </div>

  {/* Skin Scraping */}
  <div>
    <label className="flex items-center justify-between bg-gray-100 px-4 py-3 border border-gray-300 rounded-lg">
      <span className="text-gray-700">Skin Scraping - Mites Detected</span>
      <input
        type="checkbox"
        name="skinScraping.mitesDetected"
        checked={formData.skinScraping.mitesDetected}
        onChange={handleChange}
        className="h-6 w-6 text-blue-500 focus:ring focus:ring-blue-400 rounded"
      />
    </label>
  </div>
  <div>
    <label className="flex items-center justify-between bg-gray-100 px-4 py-3 border border-gray-300 rounded-lg">
      <span className="text-gray-700">Skin Scraping - Fungal Infection</span>
      <input
        type="checkbox"
        name="skinScraping.fungalInfection"
        checked={formData.skinScraping.fungalInfection}
        onChange={handleChange}
        className="h-6 w-6 text-blue-500 focus:ring focus:ring-blue-400 rounded"
      />
    </label>
  </div>

  {/* Stool Exam */}
  <div>
    <label className="flex items-center justify-between bg-gray-100 px-4 py-3 border border-gray-300 rounded-lg">
      <span className="text-gray-700">Stool Exam - Parasites Present</span>
      <input
        type="checkbox"
        name="stoolExam.parasitesPresent"
        checked={formData.stoolExam.parasitesPresent}
        onChange={handleChange}
        className="h-6 w-6 text-blue-500 focus:ring focus:ring-blue-400 rounded"
      />
    </label>
  </div>
  <div>
    <label className="flex items-center justify-between bg-gray-100 px-4 py-3 border border-gray-300 rounded-lg">
      <span className="text-gray-700">Stool Exam - Bacteria Present</span>
      <input
        type="checkbox"
        name="stoolExam.bacteriaPresent"
        checked={formData.stoolExam.bacteriaPresent}
        onChange={handleChange}
        className="h-6 w-6 text-blue-500 focus:ring focus:ring-blue-400 rounded"
      />
    </label>
  </div>
  <div>
    <label className="flex items-center justify-between bg-gray-100 px-4 py-3 border border-gray-300 rounded-lg">
      <span className="text-gray-700">Stool Exam - Blood in Stool</span>
      <input
        type="checkbox"
        name="stoolExam.bloodInStool"
        checked={formData.stoolExam.bloodInStool}
        onChange={handleChange}
        className="h-6 w-6 text-blue-500 focus:ring focus:ring-blue-400 rounded"
      />
    </label>
  </div>
</div>

      {/* Miscellaneous Fields */}
      <h3 className="text-lg font-semibold text-gray-800">Miscellaneous</h3>
      {["ultrasoundFindings", "xRayFindings"].map((key) => (
        <label key={key} className="block text-sm font-medium text-gray-700">
          {key.replace(/([A-Z])/g, " $1").trim()}
          <input
            type="text"
            name={key}
            value={formData[key]}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
      ))}

      {/* Vaccinations Section */}
      <h3 className="text-lg font-semibold text-gray-800">Vaccinations</h3>
<div className="grid grid-cols-2 gap-4">
  {/* Kennel Cough Vaccination */}
  <div>
    <label className="flex items-center justify-between bg-gray-100 px-4 py-3 border border-gray-300 rounded-lg">
      <span className="text-gray-700">Kennel Cough Vaccine</span>
      <input
        type="checkbox"
        name="vaccinations.kennelCough"
        checked={formData.vaccinations.kennelCough}
        onChange={handleChange}
        className="h-6 w-6 text-blue-500 focus:ring focus:ring-blue-400 rounded"
      />
    </label>
    <label className="block text-sm font-medium text-gray-700 mt-2">
      Date Administered
      <input
        type="date"
        name="vaccinations.kennelCoughDate"
        value={formData.vaccinations.kennelCoughDate}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </label>
  </div>

  {/* Mycoplasma Vaccination */}
  <div>
    <label className="flex items-center justify-between bg-gray-100 px-4 py-3 border border-gray-300 rounded-lg">
      <span className="text-gray-700">Mycoplasma Vaccine</span>
      <input
        type="checkbox"
        name="vaccinations.mycoplasmaVaccine"
        checked={formData.vaccinations.mycoplasmaVaccine}
        onChange={handleChange}
        className="h-6 w-6 text-blue-500 focus:ring focus:ring-blue-400 rounded"
      />
    </label>
    <label className="block text-sm font-medium text-gray-700 mt-2">
      Date Administered
      <input
        type="date"
        name="vaccinations.mycoplasmaVaccineDate"
        value={formData.vaccinations.mycoplasmaVaccineDate}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </label>
  </div>
</div>
      {/* Dental Prophylaxis Section */}
      <h3 className="text-lg font-semibold text-gray-800">Dental Prophylaxis</h3>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="dentalProphylaxis.done"
          checked={formData.dentalProphylaxis.done}
          onChange={handleChange}
          className="h-5 w-5 text-blue-500"
        />
        <span className="text-gray-700">Done</span>
      </label>
      <label className="block text-sm font-medium text-gray-700">
        Notes
        <input
          type="text"
          name="dentalProphylaxis.notes"
          value={formData.dentalProphylaxis.notes}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default TestForm;