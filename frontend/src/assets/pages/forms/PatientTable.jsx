import React, { useState } from "react";
import { FaSearch, FaPaw } from "react-icons/fa";
import PatientForm from "./PatientForm";
import { AiOutlineFileSearch } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";

const itemsPerPage = 5;
const initialOwners = [
  {
    ownerID: "O001",
    name: { first: "John", middle: "A.", last: "Doe" },
    contactInformation: {
      email: "john.doe@example.com",
      contactNumber: "123-456-7890",
    },
    patients: ["Buddy", "Max"],
    notes: "Prefers evening appointments.",
  },
  {
    ownerID: "O002",
    name: { first: "Jane", middle: "B.", last: "Smith" },
    contactInformation: {
      email: "jane.smith@example.com",
      contactNumber: "987-654-3210",
    },
    patients: ["Mittens"],
    notes: "Allergic to pet dander.",
  },
  {
    ownerID: "O003",
    name: { first: "Alice", middle: "C.", last: "Johnson" },
    contactInformation: {
      email: "alice.johnson@example.com",
      contactNumber: "456-789-0123",
    },
    patients: ["Charlie", "Daisy"],
    notes: "Prefers morning appointments.",
  },
  {
    ownerID: "O004",
    name: { first: "Bob", middle: "D.", last: "Brown" },
    contactInformation: {
      email: "bob.brown@example.com",
      contactNumber: "321-654-0987",
    },
    patients: ["Rocky"],
    notes: "Wants SMS reminders.",
  },
  {
    ownerID: "O005",
    name: { first: "Eve", middle: "E.", last: "White" },
    contactInformation: {
      email: "eve.white@example.com",
      contactNumber: "789-012-3456",
    },
    patients: ["Shadow", "Luna"],
    notes: "New client, first visit.",
  },
  {
    ownerID: "O005",
    name: { first: "Eve", middle: "E.", last: "White" },
    contactInformation: {
      email: "eve.white@example.com",
      contactNumber: "789-012-3456",
    },
    patients: ["Shadow", "Luna"],
    notes: "New client, first visit.",
  },
  {
    ownerID: "O005",
    name: { first: "Eve", middle: "E.", last: "White" },
    contactInformation: {
      email: "eve.white@example.com",
      contactNumber: "789-012-3456",
    },
    patients: ["Shadow", "Luna"],
    notes: "New client, first visit.",
  },
  {
    ownerID: "O005",
    name: { first: "Eve", middle: "E.", last: "White" },
    contactInformation: {
      email: "eve.white@example.com",
      contactNumber: "789-012-3456",
    },
    patients: ["Shadow", "Luna"],
    notes: "New client, first visit.",
  },
  {
    ownerID: "O005",
    name: { first: "Eve", middle: "E.", last: "White" },
    contactInformation: {
      email: "eve.white@example.com",
      contactNumber: "789-012-3456",
    },
    patients: ["Shadow", "Luna"],
    notes: "New client, first visit.",
  },
  {
    ownerID: "O005",
    name: { first: "Eve", middle: "E.", last: "White" },
    contactInformation: {
      email: "eve.white@example.com",
      contactNumber: "789-012-3456",
    },
    patients: ["Shadow", "Luna"],
    notes: "New client, first visit.",
  }
];

const PatientTable = () => {
  const [owners, setOwners] = useState(initialOwners);
  const [expandedOwner, setExpandedOwner] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const filteredOwners = owners.filter(owner =>
    owner.ownerID.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${owner.name.first} ${owner.name.middle} ${owner.name.last}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOwners.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOwners = filteredOwners.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="overflow-x-auto p-4 bg-gray-100 dark:bg-gray-900 min-h-full">
      <div className="relative mb-4">
        <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
        <input
          type="text"
          placeholder="Search by ID or Name..."
          className="pl-10 pr-4 py-2 border rounded-md w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-200">Owner List</h2>
      <div className="space-y-4 relative">
        {paginatedOwners.map((owner, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded shadow-md relative">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200 flex items-center">
                  {owner.name.first} {owner.name.middle} {owner.name.last}
                  <span className="ml-2 text-gray-500 dark:text-gray-400 flex items-center">
                    <FaPaw className="mr-1" /> {owner.patients.length}
                  </span>
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{owner.contactInformation.email}</p>
                <p className="text-gray-600 dark:text-gray-400">{owner.contactInformation.contactNumber}</p>
              </div>
              <div>
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  onClick={() => setExpandedOwner(expandedOwner === index ? null : index)}
                >
                  {expandedOwner === index ? "Hide Patients ▲" : "View Patients ▼"}
                </button>
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  onClick={handleOpenModal}
                >
                  ADD
                </button>
              </div>
            </div>
            {expandedOwner === index && (
              <div className="absolute right-0 mt-1 w-1/4 bg-gray-50 dark:bg-gray-700 shadow-lg rounded p-3 z-20 border border-gray-300 dark:border-gray-600">
                <ul className="list-none list-inside">
                  {owner.patients.length > 0 ? owner.patients.map((patient, i) => (
                    <li key={i} className="flex justify-between m-1 items-center">
                      <div className="text-2xl">{patient}</div>
                      <div className="flex">
                        <div className="p-1 mx-2 bg-green-800">
                          <AiOutlineFileSearch className="text-3xl" />
                        </div>
                        <div className="p-1 mx-2 bg-red-800">
                          <RiDeleteBinLine className="text-3xl" />
                        </div>
                      </div>
                    </li>
                  )) : <li>No patients listed</li>}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        <button
          className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-400" : "bg-blue-500 text-white"}`}
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-400" : "bg-blue-500 text-white"}`}
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <PatientForm isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default PatientTable;
