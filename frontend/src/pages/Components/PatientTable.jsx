import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GrOverview } from "react-icons/gr";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import axios from 'axios';
function PatientTable() {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  // Fetch patients and populate owner data (including contactNumber)


  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/patients');
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };
  
    fetchPatients();
  }, []);
   // Empty dependency array means this runs once when the component mounts

  // Filter patients based on the search query
  const filteredPatients = patients.filter((patient) => {
    const patientName = patient.name.toLowerCase();
    const patientId = patient._id.toLowerCase();
    const searchQueryLower = searchQuery.toLowerCase();

    return (
      patientName.includes(searchQueryLower) || patientId.includes(searchQueryLower)
    );
  });

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
            onClick={()=>{navigate('/PatientForm')}}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            <span className="text-lg">+ Add</span>
          </button>
        </div>
      </div>

      <div className="mt-5">
        <div className="relative shadow-md sm:rounded-lg h-[650px] overflow-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  Patient Name
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Breed
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Color
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Contact Number
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <th
                    scope="row"
                    className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center"
                  >
                    {patient.name}
                  </th>
                  <td className="px-6 py-4 text-center">{patient.breed}</td>
                  <td className="px-6 py-4 text-center">{patient.color}</td>
                  <td className="px-6 py-4 text-center">
                    {/* Display the contact number of the owner */}
                    {patient.owner ? patient.owner.contactNumber : 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-center flex items-center justify-center gap-x-5">
                    <GrOverview className='text-2xl' onClick={()=>{navigate(`/PatientOverview/${patient._id}`)}} />
                    <CiEdit className='text-2xl' />
                    <MdDeleteOutline  className='text-2xl'/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>




    </div>
  );
}

export default PatientTable;
