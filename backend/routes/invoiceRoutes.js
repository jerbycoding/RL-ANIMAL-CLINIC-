import express from "express";
import {
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  deleteAllInvoice,
} from "../controllers/invoiceController.js";

const router = express.Router();

router.get("/", getAllInvoices);
router.get("/:id", getInvoiceById);
router.post("/", createInvoice);
router.put("/:id", updateInvoice);
router.delete("/:id", deleteInvoice);
router.delete("/" ,deleteAllInvoice)
export default router;
