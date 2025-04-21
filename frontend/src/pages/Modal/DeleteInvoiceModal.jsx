import React from "react";

const DeleteInvoiceModal = ({ isOpen, onClose, invoice, onDelete }) => {
  if (!isOpen || !invoice) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-xl font-bold text-red-600 mb-4">Confirm Deletion</h2>
        <p className="text-gray-800">
          Are you sure you want to delete the invoice <strong>{invoice.invoiceNumber}</strong> for client{" "}
          <strong>{invoice.clientDetails.clientName}</strong>? This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onDelete(invoice._id)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteInvoiceModal;