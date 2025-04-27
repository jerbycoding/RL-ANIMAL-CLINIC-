import React, { useEffect, useState } from "react";
import axios from "axios";
import AddInventoryModal from "./Modal/AddInventoryModal";
import ViewInventoryModal from "./Modal/ViewInventoryModal";
import EditInventoryModal from "./Modal/EditInventoryModal";
import DeleteInventoryModal from "./Modal/DeleteInventoryModal";
const InventoryTable = () => {
  const [inventory, setInventory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get("http://localhost:5000/inventory"); // API endpoint
        setInventory(response.data);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
  }, []);

  // Filter inventory items based on the search query
  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleAddItem = async (newItem) => {
    try {
      const response = await axios.post("http://localhost:5000/inventory", newItem);
      setInventory((prev) => [...prev, response.data]); // Update state with new item
      alert("Item added successfully!");
      setIsAdding(false); 
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item.");
    }
  };

  const handleUpdateItem = async (updatedItem) => {
    try {
      await axios.put(`http://localhost:5000/inventory/${updatedItem._id}`, updatedItem);
      setInventory(
        inventory.map((item) => (item._id === updatedItem._id ? updatedItem : item))
      );
      alert("Item updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Failed to update item.");
    }
  };


  // Delete an inventory item
  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/inventory/${id}`);
      setInventory((prev) => prev.filter((item) => item._id !== id));
      alert("Item deleted successfully!");
      setIsDeleting(false);
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item.");
    }
  };




  return (
    <div className=" mx-auto p-6    rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Inventory</h1>
    <div className="flex gap-2">


      {/* Search Bar */}
        <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or category..."
            className="p-2 border border-gray-300 rounded-lg w-full mb-4"
        />
             <button
        onClick={() => setIsAdding(true)}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mb-4"
      >
        Add Item
      </button>

      </div >
      <div className="mt-5">
  <div className="relative shadow-md sm:rounded-lg min-h-[750px] overflow-y-scroll">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border border-gray-200">
      <thead className="font-bold-700 text-xs text-gray-700 uppercase bg-sky-100 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
        <tr>
          <th className="px-6 py-3 text-center">Item Name</th>
          <th className="px-6 py-3 text-center">Category</th>
          <th className="px-6 py-3 text-center">Quantity</th>
          <th className="px-6 py-3 text-center">Unit Price</th>
          <th className="px-6 py-3 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredInventory.map((item, index) => (
          <tr
            key={item._id}
            className={
              index % 2 === 0
                ? "bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                : "bg-gray-50 border-b dark:bg-gray-700 dark:border-gray-700 border-gray-200"
            }
          >
            <td className="px-6 py-4 text-center">{item.name}</td>
            <td className="px-6 py-4 text-center">{item.category}</td>
            <td className="px-6 py-4 text-center">{item.quantity}</td>
            <td className="px-6 py-4 text-center">{item.unitPrice}</td>
            <td className="px-6 py-4 text-center flex justify-center gap-x-3">
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                onClick={() => {
                  setSelectedItem(item);
                  setIsViewing(true);
                }}
              >
                View
              </button>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                onClick={() => {
                  setSelectedItem(item);
                  setIsEditing(true);
                }}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                onClick={() => {
                  setSelectedItem(item);
                  setIsDeleting(true);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

      { isAdding &&<AddInventoryModal isOpen={isAdding} onClose={() => setIsAdding(false)} onAdd={handleAddItem} />}
      {isViewing&&<ViewInventoryModal isOpen={isViewing} onClose={() => setIsViewing(false)} item={selectedItem} />}
      {isEditing&&<EditInventoryModal isOpen={isEditing} onClose={() => setIsEditing(false)} item={selectedItem} onUpdate={handleUpdateItem} />}
      <DeleteInventoryModal
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        item={selectedItem}
        onDelete={handleDeleteItem}
      />



    </div>
  );
};

export default InventoryTable;