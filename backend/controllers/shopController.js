import {Inventory} from "../models/models.js";
import {Shop} from "../models/models.js";



export const getWeeklyShopRevenue = async (req, res) => {
  try {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())); // Start of the current week (Sunday)
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 7);
    endOfWeek.setHours(23, 59, 59, 999);

    const weeklyRevenue = await Shop.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfWeek, $lt: endOfWeek },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalAmount' },
        },
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
        },
      },
    ]);

    res.json({ totalRevenue: weeklyRevenue[0]?.totalRevenue || 0 });
  } catch (error) {
    console.error('Error fetching weekly shop revenue:', error);
    res.status(500).json({ message: 'Error fetching weekly shop revenue' });
  }
};
// 📌 Create a new Shop Invoice
export const createShopInvoice = async (req, res) => {
  try {
    const { invoiceNumber, items } = req.body;

    if (!invoiceNumber) {
      return res.status(400).json({ error: 'Missing invoice number' });
    }

    const updatedItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const inventoryItem = await Inventory.findById(item.itemId);

      if (!inventoryItem) {
        return res.status(404).json({ error: `Item not found: ${item.itemId}` });
      }

      if (inventoryItem.quantity < item.quantity) {
        return res.status(400).json({ error: `Insufficient stock for ${inventoryItem.name}` });
      }

      const totalPrice = item.quantity * inventoryItem.unitPrice;

      updatedItems.push({
        itemId: inventoryItem._id,
        name: inventoryItem.name,
        category: inventoryItem.category,
        quantity: item.quantity,
        unitPrice: inventoryItem.unitPrice,
        totalPrice,
      });

      // Update stock
      inventoryItem.quantity -= item.quantity;
      await inventoryItem.save();

      totalAmount += totalPrice;
    }

    const invoice = new Shop({
      invoiceNumber,
      items: updatedItems,
      totalAmount,
    });

    const savedInvoice = await invoice.save();
    res.status(201).json(savedInvoice);
  } catch (error) {
    console.error("Shop invoice error:", error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// 📌 Get all Shop Invoices
export const getAllShopInvoices = async (req, res) => {
  try {
    const invoices = await Shop.find().sort({ createdAt: -1 });
    res.json(invoices);
  } catch (error) {
    console.error("Fetching shop invoices error:", error);
    res.status(500).json({ error: 'Server Error' });
  }
};
// 📌 Get a specific Shop Invoice by ID
export const getShopInvoiceById = async (req, res) => {
    try {
      const invoice = await Shop.findById(req.params.id);
      if (!invoice) {
        return res.status(404).json({ error: "Shop invoice not found" });
      }
      res.status(200).json(invoice);
    } catch (error) {
      console.error("Error fetching shop invoice:", error);
      res.status(500).json({ error: "Server Error" });
    }
  };
  
  // 📌 Delete a Shop Invoice by ID
  export const deleteShopInvoice = async (req, res) => {
    try {
      const invoice = await Shop.findByIdAndDelete(req.params.id);
      if (!invoice) {
        return res.status(404).json({ error: "Shop invoice not found" });
      }
      res.status(200).json({ message: "Shop invoice deleted successfully" });
    } catch (error) {
      console.error("Error deleting shop invoice:", error);
      res.status(500).json({ error: "Server Error" });
    }
  };
  
  export const deleteAllShopInvoices = async (req, res) => {
    try {
      const result = await Shop.deleteMany({}); // Delete all documents
      res.status(200).json({
        message: "All shop invoices deleted successfully",
        deletedCount: result.deletedCount,
      });
    } catch (error) {
      console.error("Error deleting all invoices:", error);
      res.status(500).json({ message: "Server error while deleting all invoices" });
    }
  };
  