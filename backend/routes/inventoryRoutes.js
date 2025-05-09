import express from "express";
import {
  createInventoryItem,
  getAllInventoryItems,
  getInventoryItemById,
  updateInventoryItem,
  deleteInventoryItem,
  getLowStockItemsCount,
} from "../controllers/inventoryController.js";

const router = express.Router();

router.post("/", createInventoryItem);
router.get("/", getAllInventoryItems);
router.get("/low-stock/count",getLowStockItemsCount);
router.get("/:id", getInventoryItemById);
router.put("/:id", updateInventoryItem);
router.delete("/:id", deleteInventoryItem);

export default router;
