import {Inventory} from "../models/models.js";

// Create Inventory Item
export const createInventoryItem = async (req, res) => {
  try {
    const newItem = new Inventory(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error("Error adding inventory item:", error);
    res.status(500).json({ message: "Failed to add inventory item" });
  }
};

// Get All Inventory Items
export const getAllInventoryItems = async (req, res) => {
  try {
    const allItems = await Inventory.find();
    res.status(200).json(allItems);
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res.status(500).json({ message: "Failed to fetch inventory items" });
  }
};

// Get One Inventory Item
export const getInventoryItemById = async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    console.error("Error fetching inventory item:", error);
    res.status(500).json({ message: "Failed to fetch inventory item" });
  }
};

// Update Inventory Item
export const updateInventoryItem = async (req, res) => {
  try {
    const updatedItem = await Inventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(updatedItem);
  } catch (err) {
    console.error("Update failed:", err);
    res.status(500).json({ error: "Server error while updating inventory" });
  }
};

// Delete Inventory Item
export const deleteInventoryItem = async (req, res) => {
  try {
    const item = await Inventory.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item successfully deleted" });
  } catch (error) {
    console.error("Error deleting inventory item:", error);
    res.status(500).json({ message: "Failed to delete inventory item" });
  }
};
