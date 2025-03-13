import React, { useState } from "react";
import { Pencil, Trash, Plus } from "lucide-react";

const sampleInventory = [...Array(20)].map((_, index) => ({
  id: index + 1,
  itemName: `Item ${index + 1}`,
  category: index % 2 === 0 ? "Medicine" : "Food",
  quantity: Math.floor(Math.random() * 50) + 1,
  unit: index % 2 === 0 ? "bottle" : "kg",
  pricePerUnit: (Math.random() * 50 + 10).toFixed(2),
  expirationDate: index % 2 === 0 ? "2025-06-15" : "N/A",
  supplier: { name: "Vet Supplies Co.", contactNumber: "123-456-7890" },
  notes: index % 2 === 0 ? "Prescription required" : "Grain-free",
}));

const InventoryTable = () => {
  const [inventory, setInventory] = useState(sampleInventory);
  const [searchTerm, setSearchTerm] = useState("");
  const [editItem, setEditItem] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({
    itemName: "",
    category: "",
    quantity: "",
    unit: "",
    pricePerUnit: "",
    expirationDate: "",
    supplier: { name: "", contactNumber: "" },
    notes: "",
  });

  const handleDelete = (id) => {
    setShowDeleteConfirm(true);
    setItemToDelete(id);
  };

  const confirmDelete = () => {
    setInventory(inventory.filter((item) => item.id !== itemToDelete));
    setShowDeleteConfirm(false);
    setItemToDelete(null);
  };

  const handleSave = () => {
    setInventory(inventory.map((item) => (item.id === editItem.id ? editItem : item)));
    setEditItem(null);
  };

  const handleAddItem = () => {
    setInventory([...inventory, { ...newItem, id: inventory.length + 1 }]);
    setShowAddModal(false);
    setNewItem({
      itemName: "",
      category: "",
      quantity: "",
      unit: "",
      pricePerUnit: "",
      expirationDate: "",
      supplier: { name: "", contactNumber: "" },
      notes: "",
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between mb-4  ">
        <h2 className="text-2xl font-bold">Veterinary Inventory</h2>
        <button className="bg-green-500 text-white px-4 py-2 rounded flex items-center" onClick={() => setShowAddModal(true)}>
          <Plus size={16} className="mr-2" /> Add Item
        </button>
      </div>

      <input
        type="text"
        placeholder="Search..."
        className="w-full p-2 mb-4 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="overflow-auto max-h-[680px] border rounded-lg">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200 sticky -top-1">
            <tr>
              <th className="border p-2 ">Item Name</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Unit</th>
              <th className="border p-2">Price ($)</th>
              <th className="border p-2">Expiration Date</th>
              <th className="border p-2">Supplier</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id} className="border">
                <td className="border p-2">{item.itemName}</td>
                <td className="border p-2">{item.category}</td>
                <td className="border p-2">{item.quantity}</td>
                <td className="border p-2">{item.unit}</td>
                <td className="border p-2">${item.pricePerUnit}</td>
                <td className="border p-2">{item.expirationDate}</td>
                <td className="border p-2">{item.supplier.name}</td>
                <td className="border p-2 flex gap-2 justify-center">
                  <button className="text-blue-500" onClick={() => setEditItem(item)}>
                    <Pencil size={16} />
                  </button>
                  <button className="text-red-500" onClick={() => handleDelete(item.id)}>
                    <Trash size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h3 className="text-lg font-bold">Edit Item</h3>
            <input
              type="text"
              value={editItem.itemName}
              onChange={(e) => setEditItem({ ...editItem, itemName: e.target.value })}
              className="w-full p-2 border rounded mt-2"
            />
            <div className="flex justify-end mt-4">
              <button className="mr-2 px-4 py-2 bg-gray-300 rounded" onClick={() => setEditItem(null)}>Cancel</button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryTable;
