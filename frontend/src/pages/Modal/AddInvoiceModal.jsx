import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const InvoiceForm = ({ onClose, onAdd, isOpen }) => {
  const [formData, setFormData] = useState({
    invoiceNumber: `INV-${Date.now()}`,
    dateIssued: new Date().toISOString().split("T")[0],
    petOwner: "",
    patient: "",
    services: [{ description: "", cost: 0 }],
    totalAmount: 0,
  });

  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const printRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/patients")
      .then((res) => {
        setPatients(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Failed to fetch patients:", err);
        setError("Failed to fetch patients.");
      });
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPatients([]);
      return;
    }

    const results = patients.filter((patient) =>
      `${patient.name} ${patient.owner?.name || ""}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    setFilteredPatients(results);
  }, [searchQuery, patients]);

  const handleSelectPatient = (patient) => {
    setSearchQuery(patient.name);
    setFormData((prev) => ({
      ...prev,
      patient: patient._id,
      petOwner: patient.owner?._id || "",
    }));
    setShowDropdown(false);
  };

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...formData.services];
    updatedServices[index][field] = field === "cost" ? Number(value) : value;

    const total = updatedServices.reduce((sum, item) => sum + item.cost, 0);

    setFormData((prev) => ({
      ...prev,
      services: updatedServices,
      totalAmount: total,
    }));
  };

  const addService = () => {
    setFormData((prev) => ({
      ...prev,
      services: [...prev.services, { description: "", cost: 0 }],
    }));
  };

  const removeService = (index) => {
    const updated = [...formData.services];
    updated.splice(index, 1);
    const total = updated.reduce((sum, s) => sum + s.cost, 0);

    setFormData((prev) => ({
      ...prev,
      services: updated,
      totalAmount: total,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/invoices",
        formData
      );
      onAdd(response.data);
      onClose();
      handlePrint();
    } catch (err) {
      console.error("Error creating invoice:", err);
      setError("Failed to create invoice. Please check your input.");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrint = () => {
    const printContent = printRef.current;

    if (!printContent) return;

    const printWindow = window.open("", "", "width=900,height=650");

    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice Receipt</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@3.4.17/dist/tailwind.min.css" rel="stylesheet">
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
          </style>
        </head>
        <body>
          <h1 class="text-xl font-bold">Invoice Receipt</h1>
          ${printContent.innerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full relative">
        <h2 className="text-xl font-bold mb-4">New Invoice</h2>

        {error && <div className="text-red-600 mb-3">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block">Invoice Number</label>
            <input
              type="text"
              readOnly
              value={formData.invoiceNumber}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-3">
            <label className="block">Date Issued</label>
            <input
              type="date"
              value={formData.dateIssued}
              onChange={(e) =>
                setFormData({ ...formData, dateIssued: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-3 relative">
            <label className="block">Patient</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              className="w-full p-2 border rounded"
              placeholder="Search patient or owner name"
              required
            />
            {showDropdown && filteredPatients.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border mt-1 rounded max-h-40 overflow-auto shadow">
                {filteredPatients.map((patient) => (
                  <li
                    key={patient._id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectPatient(patient)}
                  >
                    {patient.name} ({patient.owner?.name})
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2">Services</label>
            {formData.services.map((service, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Description"
                  value={service.description}
                  onChange={(e) =>
                    handleServiceChange(idx, "description", e.target.value)
                  }
                  className="flex-1 p-2 border rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="Cost"
                  value={service.cost}
                  onChange={(e) =>
                    handleServiceChange(idx, "cost", e.target.value)
                  }
                  className="w-24 p-2 border rounded"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeService(idx)}
                  className="text-red-600 font-bold"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addService}
              className="text-blue-600 mt-1"
            >
              + Add Service
            </button>
          </div>

          <div className="mb-3">
            <label className="block">Total Amount</label>
            <input
              type="number"
              value={formData.totalAmount}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>

  
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className={`px-4 py-2 rounded text-white ${
                submitting ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {submitting ? "Submitting..." : "Submit Invoice"}
            </button>
          </div>
        </form>

        <div ref={printRef} style={{ display: "none" }}>
          <div className="max-w-2xl mx-auto p-6 text-sm text-gray-800 font-sans">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-green-700">
                Pawfect Animal Clinic
              </h1>
              <p className="text-sm">123 Pet Street, Animalia City, VET 101</p>
              <p className="text-sm">
                Phone: (123) 456-7890 | Email: info@pawfectclinic.com
              </p>
            </div>

            <div className="mb-4 border-b pb-2">
              <div className="flex justify-between">
                <p>
                  <strong>Invoice #:</strong> {formData.invoiceNumber}
                </p>
                <p>
                  <strong>Date:</strong> {formData.dateIssued}
                </p>
              </div>
              <div className="mt-2">
                <p>
                  <strong>Patient:</strong> {searchQuery}
                </p>
                <p>
                  <strong>Pet Owner ID:</strong> {formData.petOwner}
                </p>
              </div>
            </div>

            <table className="w-full border border-gray-300 mb-4">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th>Hello World</th>
                  <th className="border px-3 py-2">Description</th>
                  <th className="border px-3 py-2">Cost</th>
                </tr>
              </thead>
              <tbody>
                {formData.services.map((s, i) => (
                  <tr key={i} className="border-t">
                    <td className="border px-3 py-1">{s.description}</td>
                    <td className="border px-3 py-1">${s.cost.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-right mb-4">
              <p className="text-lg font-semibold">
                Total:{" "}
                <span className="text-green-700">
                  ${formData.totalAmount.toFixed(2)}
                </span>
              </p>
            </div>

            {formData.notes && (
              <div className="mb-4">
                <p>
                  <strong>Notes:</strong>
                </p>
                <p className="italic text-gray-600">{formData.notes}</p>
              </div>
            )}

            <div className="text-center mt-8 border-t pt-4">
              <p className="font-semibold text-gray-700">
                Thank you for trusting Pawfect Animal Clinic 🐾
              </p>
              <p className="text-xs text-gray-500">
                This receipt is system generated and does not require a
                signature.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
