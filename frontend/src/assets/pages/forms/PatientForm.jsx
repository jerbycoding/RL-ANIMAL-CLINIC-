import React, { useState } from "react";

const PatientForm = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    ownerID: "",
    name: "",
    species: "dog",
    breed: "",
    age: "",
    gender: "male",
    weight: "",
    vaccination: [],
    allergies: "",
    medicalHistory: "",
    currentMedication: "",
    patientCode: "",
    status: "active",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Patient Data Submitted:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Register a New Patient</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="ownerID" placeholder="Owner ID" value={formData.ownerID} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="name" placeholder="Pet Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
          <select name="species" value={formData.species} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
          <input type="text" name="breed" placeholder="Breed" value={formData.breed} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} className="w-full p-2 border rounded" required />
          <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unknown">Unknown</option>
          </select>
          <input type="number" name="weight" placeholder="Weight (kg)" value={formData.weight} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="allergies" placeholder="Allergies (comma separated)" value={formData.allergies} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="medicalHistory" placeholder="Medical History" value={formData.medicalHistory} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="currentMedication" placeholder="Current Medication" value={formData.currentMedication} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="patientCode" placeholder="Patient Code" value={formData.patientCode} onChange={handleChange} className="w-full p-2 border rounded" required />
          <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="deceased">Deceased</option>
          </select>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientForm;
