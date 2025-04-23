import React, { useEffect, useState } from "react";
import axios from "axios";
import { DotLoader } from "react-spinners";
import { useNavigate, useParams } from "react-router-dom";
import { RiTestTubeLine } from "react-icons/ri";
import { TiHeartOutline } from "react-icons/ti";
import { useSnackbar } from "notistack";
const PatientDetail = () => {
    const { enqueueSnackbar } = useSnackbar();
  const [patient, setPatient] = useState(null);
  const [exams, setExams] = useState([]);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        setLoading(true);

        const patientRes = await axios.get(
          `http://localhost:5000/patients/${id}`
        );
        setPatient(patientRes.data);

        // Handle tests fetching
        try {
          const testsRes = await axios.get(`http://localhost:5000/tests/${id}`);
          setTests(testsRes.data);
        } catch (err) {
          if (err.response?.status === 404) {
            setTests([]); // No tests available, set empty array
          } else {
            throw err; // Rethrow error if it's unexpected
          }
        }

        // Handle exams fetching
        try {
          const examsRes = await axios.get(`http://localhost:5000/exams/${id}`);
          setExams(examsRes.data);
        } catch (err) {
          if (err.response?.status === 404) {
            setExams([]); // No exams available, set empty array
          } else {
            throw err; // Rethrow error if it's unexpected
          }
        }
      } catch (err) {
        setError("Error fetching patient data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [id]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDeleteExam = async (examId) => {
    try {
      setDeleteTarget({ type: "exam", id: examId });
    } catch (err) {
      console.error("Failed to delete exam", err);
    }
  };

  const handleDeleteTest = async (testId) => {
    try {
      setDeleteTarget({ type: "test", id: testId });
    } catch (err) {
      console.error("Error deleting test:", err);
      alert("Failed to delete test");
    }
  };

  const handleViewTest = (test) => {
    setSelectedTest(test); // Set the selected test to be displayed in the modal
  };
  const handleViewExam = (exam) => {
    setSelectedExam(exam); // Set the selected test to be displayed in the modal
  };
  const confirmDelete = async () => {
    if (!deleteTarget) return;
  
    try {
      if (deleteTarget.type === "exam") {
        await axios.delete(`http://localhost:5000/exams/${deleteTarget.id}`);
        setExams((prev) => prev.filter((e) => e._id !== deleteTarget.id));
      } else if (deleteTarget.type === "test") {
        await axios.delete(`http://localhost:5000/tests/${deleteTarget.id}`);
        setTests((prev) => prev.filter((t) => t._id !== deleteTarget.id));
      }
      enqueueSnackbar("Delete Succesfully", {variant:"success"})
      setDeleteTarget(null);
    } catch (err) {
      enqueueSnackbar("Error", {variant:"error"})
      console.error("Deletion error:", err);
      alert("Failed to delete");
      setDeleteTarget(null);
    }
  };
  const closeModal = () => {
    setSelectedTest(null);
    setSelectedExam(null); // Close the modal by clearing the selected test
  };

  if (loading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <DotLoader size={40} />
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-xl text-red-600">{error}</p>;
  }

  if (!patient) {
    return (
      <p className="text-center text-xl text-gray-700">
        Patient data not available.
      </p>
    );
  }

  return (
    <div>
      <div className="flex justify-end">
        <button
          onClick={() => {
            navigate("/dashboard/PatientManagement");
          }}
          className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
        >
          Exit
        </button>
      </div>

      <div className="bg-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Left Column: Patient + Owner Info */}
        <div className="space-y-6">
          {/* Patient Overview */}
          <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              🐾 Patient Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-200">
              <div>
                <span className="font-medium text-gray-500">Name:</span>{" "}
                {patient.name}
              </div>
              <div>
                <span className="font-medium text-gray-500">
                  Date of Birth:
                </span>{" "}
                {formatDate(patient.dateOfBirth)}
              </div>
              <div>
                <span className="font-medium text-gray-500">Sex:</span>{" "}
                {patient.sex}
              </div>
              <div>
                <span className="font-medium text-gray-500">Breed:</span>{" "}
                {patient.breed}
              </div>
              <div>
                <span className="font-medium text-gray-500">Species:</span>{" "}
                {patient.species}
              </div>
              <div>
                <span className="font-medium text-gray-500">Color:</span>{" "}
                {patient.color}
              </div>
            </div>
          </div>

          {/* Owner Information */}
          <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              👤 Owner Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-200">
              <div>
                <span className="font-medium text-gray-500">Name:</span>{" "}
                {patient.owner.name}
              </div>
              <div>
                <span className="font-medium text-gray-500">Address:</span>{" "}
                {patient.owner.address}
              </div>
              <div>
                <span className="font-medium text-gray-500">Contact:</span>{" "}
                {patient.owner.contactNumber}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Lab Tests + Physical Exams */}
        <div className="space-y-6">
          {/* Laboratory/Diagnostic Tests Table */}
          <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800  mb-4 flex items-center">
              <RiTestTubeLine /> Laboratory/Diagnostic Tests
            </h2>
            {tests.length === 0 ? (
              <p className="text-gray-700 dark:text-gray-200">
                No tests found for this patient.
              </p>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                {/* Table header (static) */}
                <table className="min-w-full bg-white dark:bg-gray-800">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="py-2 px-4 border-b">Test Date</th>
                      <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                  </thead>
                </table>

                {/* Table body (scrollable) */}
                <div className="max-h-[250px] overflow-y-auto">
                  <table className="min-w-full bg-white dark:bg-gray-800">
                    <tbody>
                      {tests.map((test) => (
                        <tr key={test._id}>
                          <td className="py-2 px-4 border-b">
                            {formatDate(test.testDate)}
                          </td>
                          <td className="py-2 px-4 border-b flex space-x-2 justify-center">
                            <button
                              onClick={() => handleViewTest(test)}
                              className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleDeleteTest(test._id)}
                              className="bg-red-500 text-white px-4 py-2 rounded-md"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
            {console.log(exams)}
            {console.log(tests)} 
          {/* Physical Exams Section */}
          <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-2 flex items-center">
              {" "}
              <TiHeartOutline />
              Physical Exams
            </h2>
            {exams.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 dark:border-gray-700">
                  <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                      <th className="p-2 border">Date</th>
                      <th className="p-2 border">Abnormality</th>
                      <th className="p-2 border">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exams.map((exam) => (
                      <tr
                        key={exam._id}
                        className="border-b dark:border-gray-700"
                      >
                        <td className="p-2 text-sm">
                          {new Date(exam.examDate).toLocaleDateString()}
                        </td>
                        <td className="p-2 text-sm">{exam.description}</td>
                        <td className="p-2 flex justify-center gap-2">
                          <button
                            onClick={() => {
                              handleViewExam(exam);
                            }}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDeleteExam(exam._id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-md"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                No physical exams available.
              </p>
            )}
          </div>
        </div>

        {selectedExam && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 overflow-auto">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-2xl w-full max-w-4xl mx-4">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                🩺 Physical Exam Summary
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-800 dark:text-gray-200">
                {/* Exam Date and Description */}
                <div className="col-span-1">
                  <h3 className="text-lg font-semibold mb-2">🗓️ General</h3>
                  <div className="space-y-1">
                    <p>
                      <strong>Exam Date:</strong>{" "}
                      {formatDate(selectedExam.examDate)}
                    </p>
                    <p>
                      <strong>Description:</strong> {selectedExam.description}
                    </p>
                  </div>
                </div>

                {/* Vitals */}
                <div className="col-span-1">
                  <h3 className="text-lg font-semibold mb-2">📊 Vitals</h3>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>Weight: {selectedExam.weight} kg</li>
                    <li>Temperature: {selectedExam.temperature} °C</li>
                    <li>Pulse: {selectedExam.pulse} bpm</li>
                    <li>Respiration: {selectedExam.respiration} bpm</li>
                  </ul>
                </div>

                {/* General Observations */}
                <div className="col-span-1">
                  <h3 className="text-lg font-semibold mb-2">
                    👁️ General Observations
                  </h3>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>Condition: {selectedExam.generalCondition}</li>
                    <li>Attitude: {selectedExam.generalAttitude}</li>
                    <li>Hydration: {selectedExam.hydration}</li>
                    <li>Mucous Membranes: {selectedExam.mucous}</li>
                  </ul>
                </div>

                {/* Body Systems */}
                <div className="col-span-1">
                  <h3 className="text-lg font-semibold mb-2">
                    🧍‍♂️ Body Systems
                  </h3>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>Head & Neck: {selectedExam.headNeck}</li>
                    <li>Eyes: {selectedExam.eyes}</li>
                    <li>Ears: {selectedExam.ears}</li>
                    <li>Gastrointestinal: {selectedExam.gastrointestinal}</li>
                    <li>Urogenitals: {selectedExam.urogenitals}</li>
                    <li>Respiratory: {selectedExam.respiratory}</li>
                    <li>Circulatory: {selectedExam.circulatory}</li>
                    <li>Musculoskeletal: {selectedExam.musculoskeletal}</li>
                    <li>Lymph Nodes: {selectedExam.lymphNodes}</li>
                    <li>Venous Return: {selectedExam.venousReturn}</li>
                    <li>
                      Integumentary (Skin): {selectedExam.integumentarySkin}
                    </li>
                  </ul>
                </div>
              </div>

              {/* Close Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 rounded-md bg-gray-700 hover:bg-gray-800 text-white font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal for Viewing Test Details */}
        {selectedTest && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 overflow-auto">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-2xl w-full max-w-4xl mx-4">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                🧪 Test Results Overview
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-800 dark:text-gray-200">
                {/* General Test Info */}
                <div className="col-span-1">
                  <h3 className="text-lg font-semibold mb-2">📅 General</h3>
                  <div className="space-y-1">
                    <p>
                      <strong>Test Date:</strong>{" "}
                      {formatDate(selectedTest.testDate)}
                    </p>
                    <p>
                      <strong>Distemper:</strong> {selectedTest.distemperTest}
                    </p>
                    <p>
                      <strong>Ehrlichia:</strong> {selectedTest.ehrlichiaTest}
                    </p>
                    <p>
                      <strong>Heartworm:</strong> {selectedTest.heartwormTest}
                    </p>
                    <p>
                      <strong>Parvo:</strong> {selectedTest.parvoTest}
                    </p>
                  </div>
                </div>

                {/* Imaging */}
                <div className="col-span-1">
                  <h3 className="text-lg font-semibold mb-2">🖼️ Imaging</h3>
                  <div className="space-y-1">
                    <p>
                      <strong>Ultrasound:</strong>{" "}
                      {selectedTest.ultrasoundFindings}
                    </p>
                    <p>
                      <strong>X-Ray:</strong> {selectedTest.xRayFindings}
                    </p>
                  </div>
                </div>

                {/* Blood Test */}
                <div className="col-span-1">
                  <h3 className="text-lg font-semibold mb-2 border-b pb-1">
                    🩸 Blood Test
                  </h3>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>Hemoglobin: {selectedTest.bloodTest.hemoglobin}</li>
                    <li>RBC Count: {selectedTest.bloodTest.rbcCount}</li>
                    <li>WBC Count: {selectedTest.bloodTest.wbcCount}</li>
                    <li>
                      Platelet Count: {selectedTest.bloodTest.plateletCount}
                    </li>
                    <li>Glucose: {selectedTest.bloodTest.glucose}</li>
                  </ul>
                </div>

                {/* Urine Exam */}
                <div className="col-span-1">
                  <h3 className="text-lg font-semibold mb-2 border-b pb-1">
                    💧 Urine Exam
                  </h3>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>pH Level: {selectedTest.urineExam.phLevel ?? "N/A"}</li>
                    <li>
                      Protein in Urine:{" "}
                      {selectedTest.urineExam.proteinInUrine ? "Yes" : "No"}
                    </li>
                    <li>
                      Bacteria Present:{" "}
                      {selectedTest.urineExam.bacteriaPresent ? "Yes" : "No"}
                    </li>
                  </ul>
                </div>

                {/* Stool Exam */}
                <div className="col-span-1">
                  <h3 className="text-lg font-semibold mb-2 border-b pb-1">
                    💩 Stool Exam
                  </h3>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>
                      Parasites Present:{" "}
                      {selectedTest.stoolExam.parasitesPresent ? "Yes" : "No"}
                    </li>
                    <li>
                      Bacteria Present:{" "}
                      {selectedTest.stoolExam.bacteriaPresent ? "Yes" : "No"}
                    </li>
                    <li>
                      Blood in Stool:{" "}
                      {selectedTest.stoolExam.bloodInStool ? "Yes" : "No"}
                    </li>
                  </ul>
                </div>

                {/* Skin Scraping */}
                <div className="col-span-1">
                  <h3 className="text-lg font-semibold mb-2 border-b pb-1">
                    🧴 Skin Scraping
                  </h3>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>
                      Mites Detected:{" "}
                      {selectedTest.skinScraping.mitesDetected ? "Yes" : "No"}
                    </li>
                    <li>
                      Fungal Infection:{" "}
                      {selectedTest.skinScraping.fungalInfection ? "Yes" : "No"}
                    </li>
                  </ul>
                </div>

                {/* Ear Swab */}
                <div className="col-span-1">
                  <h3 className="text-lg font-semibold mb-2 border-b pb-1">
                    👂 Ear Swab
                  </h3>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>
                      Infection:{" "}
                      {selectedTest.earSwabTest.infection ? "Yes" : "No"}
                    </li>
                    <li>
                      Bacteria Present:{" "}
                      {selectedTest.earSwabTest.bacteriaPresent ? "Yes" : "No"}
                    </li>
                  </ul>
                </div>

                {/* Vaginal Smear */}
                <div className="col-span-1">
                  <h3 className="text-lg font-semibold mb-2 border-b pb-1">
                    👩‍⚕️ Vaginal Smear
                  </h3>
                  <ul className="ml-4 list-disc space-y-1">
                    <li>
                      Bacterial Infection:{" "}
                      {selectedTest.vaginalSmear.bacterialInfection
                        ? "Yes"
                        : "No"}
                    </li>
                    <li>
                      Yeast Infection:{" "}
                      {selectedTest.vaginalSmear.yeastInfection ? "Yes" : "No"}
                    </li>
                  </ul>
                </div>
              </div>

              {/* Close Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 rounded-md bg-gray-700 hover:bg-gray-800 text-white font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        {deleteTarget && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        Confirm Deletion
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Are you sure you want to delete this {deleteTarget.type}?
      </p>
      <div className="flex justify-end gap-4">
        <button
          onClick={() => setDeleteTarget(null)}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded"
        >
          Cancel
        </button>
        <button
          onClick={confirmDelete}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}
      </div>
    </div>
  );
};

export default PatientDetail;
