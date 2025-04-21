import React, { useState } from "react";

const AddInventoryModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: 0,
    unitPrice: 0.0,
    supplier: "",
    expirationDate: "",
    notes: "",
  });

  if (!isOpen) return null; // Hide modal when not open

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData); // Pass the item data to the parent component
    setFormData({
      name: "",
      category: "",
      quantity: 0,
      unitPrice: 0.0,
      supplier: "",
      expirationDate: "",
      notes: "",
    });
    onClose(); // Close modal after adding
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Add New Inventory Item</h2>

        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700">Item Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            required
          />

          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            required
          >
            <option value="">Select Category</option>
            <option value="Medicine">Medicine</option>
            <option value="Food">Food</option>
            <option value="Vaccines">Vaccines</option>
            <option value="Surgical Supplies">Surgical Supplies</option>
            <option value="Other">Other</option>
          </select> 
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            required
          />

          <label className="block text-sm font-medium text-gray-700">Unit Price</label>
          <input
            type="number"
            name="unitPrice"
            value={formData.unitPrice}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            required
          />

          <label className="block text-sm font-medium text-gray-700">Supplier</label>
          <input
            type="text"
            name="supplier"
            value={formData.supplier}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          />

          <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
          <input
            type="date"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          />

          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          ></textarea>

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInventoryModal;