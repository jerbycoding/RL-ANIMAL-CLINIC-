import React, { useEffect, useState } from "react";
import axios from "axios";
import InvoiceForm from "./Modal/AddInvoiceModal"; // Assuming this is your form
import ViewInvoiceModal from "./Modal/ViewInvoiceModal";

const InvoiceDashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isViewing, setIsViewing] = useState(false);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/invoices");
        setInvoices(response.data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices();
  }, []);

  const handleAddInvoice = (newInvoice) => {
    setInvoices((prev) => [...prev, newInvoice]);
    setIsAdding(false);
    alert("Invoice added successfully!");
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Invoice List</h1>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Add Invoice
        </button>
      </div>

      {/* Invoice Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Invoice #</th>
              <th className="px-4 py-3 text-left">Owner Name</th>
              <th className="px-4 py-3 text-left">Patient Name</th>
              <th className="px-4 py-3 text-left">Date Issued</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {invoices.map((invoice) => {
              const hasPatient = invoice.patient !== null;
              const ownerName = hasPatient ? invoice.patient?.owner?.name || "N/A" : "Deleted Patient";
              const patientName = hasPatient ? invoice.patient?.name || "N/A" : "Deleted Patient";

              return (
                <tr key={invoice._id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-3">{invoice.invoiceNumber || "N/A"}</td>
                  <td className="px-4 py-3">{ownerName}</td>
                  <td className="px-4 py-3">{patientName}</td>
                  <td className="px-4 py-3">
                    {new Date(invoice.dateIssued).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">₱{invoice.totalAmount.toFixed(2)}</td>
                  <td className="px-4 py-3 space-x-2">
                    <button
                      onClick={() => {
                        setSelectedInvoice(invoice);
                        setIsViewing(true);
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Invoice Modal */}
      {isAdding && (
        <InvoiceForm
          isOpen={isAdding}
          onClose={() => setIsAdding(false)}
          onAdd={handleAddInvoice}
        />
      )}

      {/* View Invoice Modal */}
      {isViewing && (
        <ViewInvoiceModal
          isOpen={isViewing}
          onClose={() => setIsViewing(false)}
          invoice={selectedInvoice}
        />
      )}
    </div>
  );
};

export default InvoiceDashboard;
