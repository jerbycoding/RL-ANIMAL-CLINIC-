import express from "express";
import { createShopInvoice, getAllShopInvoices, getShopInvoiceById, deleteShopInvoice , deleteAllShopInvoices} from "../controllers/shopController.js";

const router = express.Router();

router.post("/", createShopInvoice);
router.get("/", getAllShopInvoices);
router.get("/:id", getShopInvoiceById);     
router.delete("/:id", deleteShopInvoice);    
router.delete("/", deleteAllShopInvoices);
export default router;
