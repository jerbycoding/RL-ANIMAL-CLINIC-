import express from "express";
import {
  getAllInvoices,
  // getInvoiceById,
  // updateInvoice,
  createInvoice,
  // deleteInvoice,
  getWeeklyRevenue

} from "../controllers/invoiceController.js";

const router = express.Router();

router.get("/", getAllInvoices);
// router.get("/:id", getInvoiceById);
router.get("/revenue/this-week", getWeeklyRevenue);
router.post("/", createInvoice);
// router.put("/:id", updateInvoice);
// router.delete("/:id", deleteInvoice);
// router.delete("/" ,deleteAllInvoice)
export default router;
