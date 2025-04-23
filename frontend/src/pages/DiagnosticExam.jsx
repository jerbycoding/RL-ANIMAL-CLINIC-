import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { DotLoader } from "react-spinners";
const TestForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    patient: "",
    bloodTest: {
      hemoglobin: "",
      rbcCount: "",
      wbcCount: "",
      plateletCount: "",
      glucose: "",
    },
    distemperTest: "",
    earSwabTest: { infection: false, bacteriaPresent: false },
    ehrlichiaTest: "",
    heartwormTest: "",
    parvoTest: "",
    skinScraping: { mitesDetected: false, fungalInfection: false },
    stoolExam: {
      parasitesPresent: false,
      bacteriaPresent: false,
      bloodInStool: false,
    },
    ultrasoundFindings: "",
    urineExam: { phLevel: "", proteinInUrine: false, bacteriaPresent: false },
    vaginalSmear: { bacterialInfection: false, yeastInfection: false },
    xRayFindings: "",
  });

  // Fetch patients
  useEffect(() => {
    setLoading(true);
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:5000/patients/");
        setPatients(response.data);
        setLoading(false);
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
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    } else {
      const [key, subKey] = keys;
      setFormData({
        ...formData,
        [key]: {
          ...formData[key],
          [subKey]: type === "checkbox" ? checked : value,
        },
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentDate = new Date().toISOString().split("T")[0];

    try {
      await axios.post("http://localhost:5000/tests", {
        ...formData,
        testDate: currentDate,
      });
      enqueueSnackbar("Successfully", { variant: "success" });
      setFormData({
        patient: "",
        bloodTest: {
          hemoglobin: "",
          rbcCount: "",
          wbcCount: "",
          plateletCount: "",
          glucose: "",
        },
        distemperTest: "",
        earSwabTest: { infection: false, bacteriaPresent: false },
        ehrlichiaTest: "",
        heartwormTest: "",
        parvoTest: "",
        skinScraping: { mitesDetected: false, fungalInfection: false },
        stoolExam: {
          parasitesPresent: false,
          bacteriaPresent: false,
          bloodInStool: false,
        },
        ultrasoundFindings: "",
        urineExam: { phLevel: "", proteinInUrine: false, bacteriaPresent: false },
        vaginalSmear: { bacterialInfection: false, yeastInfection: false },
        xRayFindings: "",
      });
      setSearchQuery("");
    } catch (error) {
      console.error("Error submitting form:", error);
      enqueueSnackbar("Error", { variant: "error" });
    }
  };
  if(loading){
    return (
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ' >
          <DotLoader size={40}/>
          <h1>Loading...</h1>
      </div>
    )
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 bg-white shadow-xl rounded-xl space-y-8 max-w-4xl mx-auto"
    >
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Complete Test Form
      </h1>

      {/* Patient Search */}
      <div className="space-y-2">
        <label className="block text-gray-700 text-sm font-medium">
          Search Patient
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Type a patient name..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchQuery && dropdownVisible && (
            <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
              {filteredPatients.map((patient) => (
                <li
                  key={patient._id}
                  onClick={() => handleSelectPatient(patient)}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white transition"
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
      </div>

      {/* Blood Tests */}
      <section className="bg-gray-50 p-6 rounded-lg shadow-md border">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">Blood Test</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(formData.bloodTest).map((key) => (
            <label
              key={key}
              className="block text-sm font-medium text-gray-700"
            >
              {key.replace(/([A-Z])/g, " $1").trim()}
              <input
                type="number"
                name={`bloodTest.${key}`}
                value={formData.bloodTest[key]}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          ))}
        </div>
      </section>

      {/* Infection Tests */}
      <section className="bg-gray-50 p-6 rounded-lg shadow-md border">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">
          Infection Tests
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["distemperTest", "ehrlichiaTest", "heartwormTest", "parvoTest"].map(
            (key) => (
              <label
                key={key}
                className="block text-sm font-medium text-gray-700"
              >
                {key.replace(/([A-Z])/g, " $1").trim()}
                <select
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select</option>
                  <option value="Positive">Positive</option>
                  <option value="Negative">Negative</option>
                </select>
              </label>
            )
          )}
        </div>
      </section>

      {/* Boolean Fields */}
      <section className="bg-gray-50 p-6 rounded-lg shadow-md border">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">
          Boolean Findings
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              label: "Ear Swab - Infection",
              name: "earSwabTest.infection",
              checked: formData.earSwabTest.infection,
            },
            {
              label: "Ear Swab - Bacteria Present",
              name: "earSwabTest.bacteriaPresent",
              checked: formData.earSwabTest.bacteriaPresent,
            },
            {
              label: "Skin Scraping - Mites Detected",
              name: "skinScraping.mitesDetected",
              checked: formData.skinScraping.mitesDetected,
            },
            {
              label: "Skin Scraping - Fungal Infection",
              name: "skinScraping.fungalInfection",
              checked: formData.skinScraping.fungalInfection,
            },
            {
              label: "Stool Exam - Parasites Present",
              name: "stoolExam.parasitesPresent",
              checked: formData.stoolExam.parasitesPresent,
            },
            {
              label: "Stool Exam - Bacteria Present",
              name: "stoolExam.bacteriaPresent",
              checked: formData.stoolExam.bacteriaPresent,
            },
            {
              label: "Stool Exam - Blood in Stool",
              name: "stoolExam.bloodInStool",
              checked: formData.stoolExam.bloodInStool,
            },
          ].map((field) => (
            <label
              key={field.name}
              className="flex items-center justify-between bg-white px-4 py-3 border border-gray-300 rounded-md shadow-sm"
            >
              <span className="text-gray-700">{field.label}</span>
              <input
                type="checkbox"
                name={field.name}
                checked={field.checked}
                onChange={handleChange}
                className="h-5 w-5 text-blue-500"
              />
            </label>
          ))}
        </div>
      </section>

      {/* Misc Fields */}
      <section className="bg-gray-50 p-6 rounded-lg shadow-md border">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">
          Miscellaneous
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["ultrasoundFindings", "xRayFindings"].map((key) => (
            <label
              key={key}
              className="block text-sm font-medium text-gray-700"
            >
              {key.replace(/([A-Z])/g, " $1").trim()}
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          ))}
        </div>
      </section>

      <button
        type="submit"
        className="w-full px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default TestForm;
