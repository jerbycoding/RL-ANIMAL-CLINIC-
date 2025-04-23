import {Invoice} from "../models/models.js";
import {Owner} from "../models/models.js";
import {Patient} from "../models/models.js";

// Get all invoices
export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate({
        path: "patient",
        populate: {
          path: "owner",
          select: "name contactNumber"
        }
      });

    res.status(200).json(invoices);
  } catch (err) {
    console.error("Error fetching invoices:", err.message);
    res.status(500).json({ error: "Failed to fetch invoices." });
  }
};

// Get invoice by ID
export const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate("petOwner")
      .populate("patient");

    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found." });
    }
    res.status(200).json(invoice);
  } catch (err) {
    res.status(500).json({ error: "Error fetching invoice." });
  }
};

// Create new invoice
export const createInvoice = async (req, res) => {
  try {
    const {
      invoiceNumber,
      dateIssued,
      petOwner,
      patient,
      services,
      totalAmount,
      notes,
    } = req.body;

    const ownerExists = await Owner.findById(petOwner);
    const patientExists = await Patient.findById(patient);

    if (!ownerExists) {
      return res.status(400).json({ error: "Invalid pet owner ID." });
    }
    if (!patientExists) {
      return res.status(400).json({ error: "Invalid patient ID." });
    }
    if (String(patientExists.owner) !== String(petOwner)) {
      return res.status(400).json({ error: "Patient does not belong to the specified owner." });
    }

    const newInvoice = new Invoice({
      invoiceNumber,
      dateIssued,
      petOwner,
      patient,
      services,
      totalAmount,
      notes,
    });

    const savedInvoice = await newInvoice.save();
    res.status(201).json(savedInvoice);
  } catch (err) {
    console.error("Invoice creation error:", err);
    res.status(500).json({ error: "Failed to create invoice." });
  }
};

// Update invoice
export const updateInvoice = async (req, res) => {
  try {
    const {
      invoiceNumber,
      dateIssued,
      petOwner,
      patient,
      services,
      totalAmount,
      notes,
    } = req.body;

    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found." });
    }

    const ownerExists = await Owner.findById(petOwner);
    const patientExists = await Patient.findById(patient);

    if (!ownerExists || !patientExists) {
      return res.status(400).json({ error: "Invalid owner or patient ID." });
    }
    if (String(patientExists.owner) !== String(petOwner)) {
      return res.status(400).json({ error: "Patient does not belong to this owner." });
    }

    invoice.invoiceNumber = invoiceNumber;
    invoice.dateIssued = dateIssued;
    invoice.petOwner = petOwner;
    invoice.patient = patient;
    invoice.services = services;
    invoice.totalAmount = totalAmount;
    invoice.notes = notes;

    const updatedInvoice = await invoice.save();
    res.status(200).json(updatedInvoice);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update invoice." });
  }
};

// Delete invoice
export const deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found." });
    }
    res.status(200).json({ message: "Invoice deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete invoice." });
  }
};
export const deleteAllInvoice = async (req, res) => {
  try {
    const result = await Invoice.deleteMany({}); 
    res.status(200).json({
      message: "All shop invoices deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting all invoices:", error);
    res.status(500).json({ message: "Server error while deleting all invoices" });
  }
};