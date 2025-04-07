import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const PatientDetail = () => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
    const navigate = useNavigate();
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/patients/${id}`);
        setPatient(res.data);
      } catch (err) {
        setError('Error fetching patient data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [id]);

  if (loading) {
    return <p className="text-center text-xl text-gray-700">Loading patient info...</p>;
  }

  if (error) {
    return <p className="text-center text-xl text-red-600">{error}</p>;
  }

  if (!patient) {
    return <p className="text-center text-xl text-gray-700">Patient data not available.</p>;
  }

  // Function to format the date of birth
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-gray-100 flex">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 space-y-6">
        
        {/* Patient Overview */}
        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">🐾 Patient Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-200">
            <div><span className="font-medium text-gray-500">Name:</span> {patient.name}</div>
            <div><span className="font-medium text-gray-500">Date of Birth:</span> {formatDate(patient.dateOfBirth)}</div>
            <div><span className="font-medium text-gray-500">Sex:</span> {patient.sex}</div>
            <div><span className="font-medium text-gray-500">Breed:</span> {patient.breed}</div>
            <div><span className="font-medium text-gray-500">Species:</span> {patient.species}</div>
            <div><span className="font-medium text-gray-500">Color:</span> {patient.color}</div>
          </div>
        </div>

        {/* Owner Information */}
        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">👤 Owner Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-200">
            <div><span className="font-medium text-gray-500">Name:</span> {patient.owner.name}</div>
            <div><span className="font-medium text-gray-500">Address:</span> {patient.owner.address}</div>
            <div><span className="font-medium text-gray-500">Contact:</span> {patient.owner.contactNumber}</div>
          </div>
        </div>
      </div>

    </div>
    
  );
};

export default PatientDetail;
