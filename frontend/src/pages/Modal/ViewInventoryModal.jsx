import React from "react";

const ViewInventoryModal = ({ isOpen, onClose, item }) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{item.name}</h2>

        <div className="grid grid-cols-2 gap-4">
          <p><strong className="text-gray-600">Category:</strong> {item.category}</p>
          <p><strong className="text-gray-600">Quantity:</strong> {item.quantity}</p>
          <p><strong className="text-gray-600">Unit Price:</strong> ${item.unitPrice.toFixed(2)}</p>
          <p><strong className="text-gray-600">Supplier:</strong> {item.supplier || "N/A"}</p>
          <p><strong className="text-gray-600">Expiration Date:</strong> {item.expirationDate ? new Date(item.expirationDate).toLocaleDateString() : "N/A"}</p>
          <p><strong className="text-gray-600">Notes:</strong> {item.notes || "None"}</p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewInventoryModal;