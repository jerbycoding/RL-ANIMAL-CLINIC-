import React, { useState, useEffect, useRef } from "react";
import InvoiceForm from "./Modal/AddInvoiceModal";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const printRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredInvoices, setFilteredInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = () => {
    setLoading(true);
    fetch("http://localhost:5000/invoices")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setInvoices(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const handleAddInvoice = (newInvoiceData) => {
    fetch("http://localhost:5000/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newInvoiceData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        fetchInvoices();
        setIsAdding(false);
      })
      .catch((error) => {
        console.error("Error adding invoice:", error);
        setError("Failed to add invoice.");
      });
  };

  const handleSearchInputChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };

  useEffect(() => {
    const results = invoices.filter((invoice) => {
      const ownerName = invoice.patient?.owner?.name?.toLowerCase() || "";
      const patientName = invoice.patient?.name?.toLowerCase() || "";
      const invoiceNumber = invoice.invoiceNumber?.toLowerCase() || "";

      return (
        ownerName.includes(searchQuery) ||
        patientName.includes(searchQuery) ||
        invoiceNumber.includes(searchQuery)
      );
    });
    setFilteredInvoices(results);
  }, [searchQuery, invoices]);

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open("", "", "width=800,height=600");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice Receipt</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              font-size: 12px;
              padding: 10px;
              margin: 0;
            }
            .center {
              text-align: center;
            }
            .logo-space {
              margin-bottom: 10px;
            }
            .header p {
              margin: 2px 0;
            }
            .meta, .total, .footer {
              margin: 10px 0;
            }
            .items-table {
              width: 100%;
              border-collapse: collapse;
              margin: 10px 0;
            }
            .items-table th,
            .items-table td {
              border: 1px solid #000;
              padding: 4px;
              text-align: left;
            }
            .disclaimer {
              font-size: 10px;
              margin-top: 5px;
              color: #666;
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  if (loading) {
    return <div className="p-6 bg-white shadow-md rounded-lg">Loading invoices...</div>;
  }

  if (error) {
    return <div className="p-6 bg-white shadow-md rounded-lg">Error loading invoices: {error.message}</div>;
  }

  const invoicesToDisplay = searchQuery ? filteredInvoices : invoices;

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

      <div className="relative w-full max-w-xs mr-4 mb-5">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search invoices..."
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>

      {/* Invoice Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-sm">
          <thead className="bg-sky-100">
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
            {invoicesToDisplay.map((invoice) => {
              const hasPatient = invoice.patient !== null;
              const ownerName = hasPatient ? invoice.patient?.owner?.name || "N/A" : "Deleted Patient";
              const patientName = hasPatient ? invoice.patient?.name || "N/A" : "Deleted Patient";

              return (
                <tr key={invoice._id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-3">{invoice.invoiceNumber || "N/A"}</td>
                  <td className="px-4 py-3">{ownerName}</td>
                  <td className="px-4 py-3">{patientName}</td>
                  <td className="px-4 py-3">{new Date(invoice.dateIssued).toLocaleDateString()}</td>
                  <td className="px-4 py-3">₱{invoice.totalAmount ? invoice.totalAmount.toFixed(2) : "0.00"}</td>
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

      {isAdding && (
        <InvoiceForm
          isOpen={isAdding}
          onClose={() => setIsAdding(false)}
          onAdd={handleAddInvoice}
        />
      )}

      {isViewing && selectedInvoice && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
              <h2 className="text-lg font-bold mb-4">Invoice Details</h2>
              <p>Invoice Number: {selectedInvoice.invoiceNumber || "N/A"}</p>
              <p>Owner Name: {selectedInvoice.patient?.owner?.name || "N/A"}</p>
              <p>Patient Name: {selectedInvoice.patient?.name || "N/A"}</p>
              <p>Date Issued: {new Date(selectedInvoice.dateIssued).toLocaleDateString()}</p>
              <p>Total Amount: ₱{selectedInvoice.totalAmount?.toFixed(2) || "0.00"}</p>
              <h3 className="text-md font-semibold mt-4 mb-2">Services:</h3>
              {selectedInvoice.services?.length > 0 ? (
                <ul>
                  {selectedInvoice.services.map((item) => (
                    <li key={item._id}>
                      {item.service?.name || "N/A"} (₱{item.service?.charge?.toFixed(2) || "0.00"})
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No services listed.</p>
              )}
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={handlePrint}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Print
                </button>
                <button
                  onClick={() => setIsViewing(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>

          {/* Hidden Printable Content */}
          <div ref={printRef} style={{ display: "none" }}>
            <div className="receipt-container">
              <div className="center logo-space">
                {/* <img src="/logo.png" alt="Clinic Logo" className="logo" /> */}
              </div>
              <div className="center header">
                <h2>RL ANIMAL CLINIC</h2>
                <p>168-Unit A Bus Stop JP Laurel Highway, cor V Dimayuga, Brgy. 4, Tanauan, Batangas</p>
                <p>Contact: 0916 621 5953</p>
              </div>
              <hr />
              <div className="meta">
                <p><strong>Date:</strong> {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</p>
                <p><strong>Invoice No:</strong> {selectedInvoice.invoiceNumber}</p>
                <p><strong>Owner:</strong> {selectedInvoice.patient.owner.name}</p>
                <p><strong>Patient:</strong> {selectedInvoice.patient.name}</p>
              </div>
              <hr />
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Unit</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoice.services?.map((item, i) => (
                    <tr key={i}>
                      <td>{item.service?.name}</td>
                      <td>1</td>
                      <td>₱{item.service?.charge?.toFixed(2)}</td>
                      <td>₱{item.service?.charge?.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr />
              <div className="total center">
                <strong>Total Amount:</strong> ₱{selectedInvoice.totalAmount?.toFixed(2)}
              </div>
              <hr />
              <div className="footer center">
                <p>Thank you for choosing us!</p>
                <p className="disclaimer">This receipt is system generated and does not require a signature.</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InvoiceList;
