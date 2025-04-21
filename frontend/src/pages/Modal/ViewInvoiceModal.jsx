import React from "react";

const ViewInvoiceModal = ({ isOpen, onClose, invoice }) => {
  if (!isOpen || !invoice) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Invoice Details</h2>
        
        <div className="mb-2">
          <strong>Invoice #:</strong> {invoice.invoiceNumber}
        </div>
        <div className="mb-2">
          <strong>Owner Name:</strong> {invoice.patient?.owner?.name || "N/A"}
        </div>
        <div className="mb-2">
          <strong>Patient Name:</strong> {invoice.patient?.name || "N/A"}
        </div>
        <div className="mb-2">
          <strong>Date Issued:</strong> {new Date(invoice.dateIssued).toLocaleDateString()}
        </div>
        <div className="mb-2">
          <strong>Total Amount:</strong> ₱{invoice.totalAmount.toFixed(2)}
        </div>

        {/* Services List */}
        {invoice.services?.length > 0 && (
          <div className="mt-4">
            <strong>Services Rendered:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              {invoice.services.map((service, idx) => (
                <li key={idx}>
                  <span className="font-medium">{service.description}</span> — ₱{service.cost.toFixed(2)}
                  {service.notes && <div className="text-sm text-gray-500">Note: {service.notes}</div>}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Optional: Items (e.g., medicines/products) */}
        {invoice.items?.length > 0 && (
          <div className="mt-4">
            <strong>Items:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              {invoice.items.map((item, idx) => (
                <li key={idx}>
                  {item.name} — ₱{item.unitPrice.toFixed(2)} x {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="text-right mt-6">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewInvoiceModal;
