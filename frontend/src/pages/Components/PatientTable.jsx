import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GrOverview } from "react-icons/gr";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { DotLoader } from 'react-spinners';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { Variable } from 'lucide-react';
function PatientTable() {
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar()
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }finally{
      setLoading(false)
    }
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/patients/${selectedPatient}`);
      setShowModal(false);
      setSelectedPatient(null);
      fetchPatients();
      enqueueSnackbar("Delete Succesfully",{variant : "success"});
    } catch (error) {
      enqueueSnackbar("Error",{variant : "error"});
      console.error('Error deleting patient:', error);
    }
  };

  const filteredPatients = patients.filter((patient) => {
    const patientName = patient.name.toLowerCase();
    const patientId = patient._id.toLowerCase();
    const searchQueryLower = searchQuery.toLowerCase();
    return (
      patientName.includes(searchQueryLower) || patientId.includes(searchQueryLower)
    );
  });
  if(loading){
    return (
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ' >
          <DotLoader size={40}/>
          <h1>Loading...</h1>
      </div>
    )
  }
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold mb-5">Patient Management</h1>
      
      </div>
      <div className="flex justify-between items-center">
        <div className="relative w-[800px]">
          <input
            className="pl-10 w-full bg-white border-gray-300 rounded-md py-2 px-3"
            placeholder="Search Name or ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">🔍</div>
        </div>
        <div>
          <button
            onClick={()=>{navigate('/dashboard/PatientForm')}}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            <span className="text-lg">+ Add</span>
          </button>
        </div>
      </div>

      <div className="mt-6">
  <div className="relative shadow-xl sm:rounded-2xl overflow-auto max-h-[650px] border border-gray-200 dark:border-gray-700">
    <table className="w-full text-sm text-gray-700 dark:text-gray-300">
      <thead className="font-bold text-xs uppercase bg-sky-100 dark:bg-gray-800 dark:text-gray-400 sticky top-0 z-10">
        <tr>
          <th className="px-6 py-4 text-center">Patient Name</th>
          <th className="px-6 py-4 text-center">Breed</th>
          <th className="px-6 py-4 text-center">Color</th>
          <th className="px-6 py-4 text-center">Contact Number</th>
          <th className="px-6 py-4 text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        {filteredPatients.map((patient, index) => (
          <tr
            key={patient._id}
            className={`border-b ${
              index % 2 === 0
                ? "bg-white dark:bg-gray-900"
                : "bg-gray-50 dark:bg-gray-800"
            }`}
          >
            <td className="px-6 py-3 text-center font-medium text-gray-900 dark:text-white">
              {patient.name}
            </td>
            <td className="px-6 py-3 text-center">{patient.breed}</td>
            <td className="px-6 py-3 text-center">{patient.color}</td>
            <td className="px-6 py-3 text-center">
              {patient.owner ? patient.owner.contactNumber : "N/A"}
            </td>
            <td className="px-6 py-3 text-center">
              <div className="flex justify-center gap-x-4">
                <GrOverview
                  className="text-xl text-blue-600 hover:text-blue-800 cursor-pointer"
                  onClick={() => navigate(`/dashboard/PatientOverview/${patient._id}`)}
                />
                <CiEdit
                  className="text-xl text-yellow-500 hover:text-yellow-600 cursor-pointer"
                  onClick={() => navigate(`/dashboard/EditPatientForm/${patient._id}`)}
                />
                <MdDeleteOutline
                  className="text-xl text-red-500 hover:text-red-700 cursor-pointer"
                  onClick={() => {
                    setSelectedPatient(patient._id);
                    setShowModal(true);
                  }}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md mx-4">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              Confirm Deletion
            </h2>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
              Are you sure you want to delete this patient? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientTable;
