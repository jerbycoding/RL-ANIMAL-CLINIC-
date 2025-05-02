import React, { useState, useEffect } from 'react';
import { useSnackbar } from "notistack";
const InvoiceForm = ({ isOpen, onClose, onAdd }) => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [patientNameInput, setPatientNameInput] = useState('');
  const [patientId, setPatientId] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [availableServices, setAvailableServices] = useState([]);
  const [selectedServiceIds, setSelectedServiceIds] = useState([]);
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Fetch patients and services
    fetch('http://localhost:5000/patients')
      .then(response => response.json())
      .then(data => setPatients(data))
      .catch(error => console.error('Error fetching patients:', error));

    fetch('http://localhost:5000/services')
      .then(response => response.json())
      .then(data => setAvailableServices(data))
      .catch(error => console.error('Error fetching services:', error));

    // Generate initial invoice number
    generateInvoiceNumber();
  }, []);

  const generateInvoiceNumber = () => {
    const prefix = 'INV-';
    const timestamp = Date.now().toString().slice(-6); // Last 6 digits of timestamp
    const randomNumber = Math.floor(Math.random() * 1000).toString().padStart(3, '0'); // 3 random digits
    setInvoiceNumber(prefix + timestamp + randomNumber);
  };

  const handlePatientInputChange = (event) => {
    const inputText = event.target.value;
    setPatientNameInput(inputText);
    setShowPatientDropdown(true);
    const filtered = patients.filter(patient =>
      patient.name.toLowerCase().includes(inputText.toLowerCase())
    );
    setFilteredPatients(filtered);
    // Reset patientId if the input changes and doesn't match a selected patient
    if (!filtered.some(p => p.name.toLowerCase() === inputText.toLowerCase())) {
      setPatientId('');
    }
  };

  const selectPatient = (patient) => {
    setPatientNameInput(patient.name);
    setPatientId(patient._id);
    setShowPatientDropdown(false);
  };

  const handleServiceChange = (event) => {
    const serviceId = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedServiceIds([...selectedServiceIds, serviceId]);
    } else {
      setSelectedServiceIds(selectedServiceIds.filter(id => id !== serviceId));
    }
  };

  useEffect(() => {
    // Calculate total amount whenever selected services change
    let total = 0;
    selectedServiceIds.forEach(serviceId => {
      const service = availableServices.find(s => s._id === serviceId);
      if (service && service.charge) {
        total += service.charge;
      }
    });
    setTotalAmount(total.toFixed(2));
  }, [selectedServiceIds, availableServices]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!patientId) {
      alert('Please select a patient.');
      return;
    }

    const newInvoice = {
      invoiceNumber,
      patientId,
      services: selectedServiceIds,
      totalAmount: parseFloat(totalAmount),
    };

    onAdd(newInvoice);
    onClose(); // Close the modal after adding
    resetForm();
    generateInvoiceNumber(); // Generate a new number for the next invoice
    enqueueSnackbar("Invoice submitted successfully!", { variant: "success" });

  };

  const resetForm = () => {
    setPatientNameInput('');
    setPatientId('');
    setSelectedServiceIds([]);
    setTotalAmount('');
    setShowPatientDropdown(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Add New Invoice</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="invoiceNumber" className="block text-sm font-medium text-gray-700">Invoice Number:</label>
            <input
              type="text"
              id="invoiceNumber"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={invoiceNumber}
              readOnly
            />
          </div>
          <div className='relative'>
            <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">Patient:</label>
            <input
              type="text"
              id="patientName"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={patientNameInput}
              onChange={handlePatientInputChange}
              onFocus={() => setShowPatientDropdown(true)}
            />
            {showPatientDropdown && filteredPatients.length > 0 && (
              <ul className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg mt-1 w-full max-h-48 overflow-y-auto">
                {filteredPatients.map(patient => (
                  <li
                    key={patient._id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => selectPatient(patient)}
                  >
                    {patient.name} - {patient.owner.name}
                  </li>
                ))}
              </ul>
            )}
            {showPatientDropdown && filteredPatients.length === 0 && patientNameInput && (
              <p className="mt-1 text-sm text-gray-500">No patients found.</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Services:</label>
            <div className="mt-1 space-y-2">
              {availableServices.map(service => (
                <div key={service._id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`service-${service._id}`}
                    value={service._id}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                    checked={selectedServiceIds.includes(service._id)}
                    onChange={handleServiceChange}
                  />
                  <label htmlFor={`service-${service._id}`} className="ml-2 text-sm text-gray-700">{service.name} (₱{service.charge.toFixed(2)})</label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700">Total Amount:</label>
            <input
              type="text"
              id="totalAmount"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={`₱${totalAmount}`}
              readOnly
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md">Cancel</button>
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">Add Invoice</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceForm;