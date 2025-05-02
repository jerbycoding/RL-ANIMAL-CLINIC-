import mongoose from 'mongoose'
import { Invoice, Patient } from '../models/models.js';


export const createInvoice = async (req, res) => {
  try {
    const { invoiceNumber, dateIssued, patientId, services, totalAmount } = req.body;

    // Validate invoiceNumber
    if (!invoiceNumber || typeof invoiceNumber !== 'string' || invoiceNumber.trim() === '') {
      return res.status(400).json({ message: 'Invoice number is required' });
    }

    // Validate patientId
    if (!patientId || !mongoose.Types.ObjectId.isValid(patientId)) {
      return res.status(400).json({ message: 'Invalid patientId provided' });
    }

    // Check if the patient exists (optional, but recommended for data integrity)
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Validate services
    if (!services || !Array.isArray(services) || services.length === 0) {
      return res.status(400).json({ message: 'At least one service ID is required' });
    }

    const areServiceIdsValid = services.every(serviceId => mongoose.Types.ObjectId.isValid(serviceId));
    if (!areServiceIdsValid) {
      return res.status(400).json({ message: 'One or more invalid service IDs' });
    }

    // Validate totalAmount
    if (typeof totalAmount !== 'number' || isNaN(totalAmount)) {
      return res.status(400).json({ message: 'Total amount must be a number' });
    }
    if (totalAmount < 0) {
      return res.status(400).json({ message: 'Total amount cannot be negative' });
    }

    // Create the invoice document directly from the request body
    const newInvoice = new Invoice({
      invoiceNumber,
      dateIssued: dateIssued || Date.now(), // Use provided or default to now
      patient: patientId,
      services: services.map(serviceId => ({ service: serviceId })),
      totalAmount,
    });
    const savedInvoice = await newInvoice.save();


    const populatedInvoice = await Invoice.findById(savedInvoice._id)
    .populate({
      path: 'patient',
      populate: {
        path: 'owner' // assuming this is a ref to the Owner model
      }
    })
    .populate('services.service');
    res.status(201).json(populatedInvoice);
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(500).json({ message: 'Failed to create invoice', error: error.message });
  }
};

export const getWeeklyRevenue = async (req, res) => {
  try {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Monday
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday
    endOfWeek.setHours(23, 59, 59, 999);

    const invoices = await Invoice.find({
      dateIssued: { $gte: startOfWeek, $lte: endOfWeek },
    });

    const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0);

    res.json({
      weekStart: startOfWeek,
      weekEnd: endOfWeek,
      totalRevenue,
      invoiceCount: invoices.length,
    });
  } catch (error) {
    console.error("Revenue fetch error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
    .populate({
      path: 'patient',
      populate: {
        path: 'owner' // same nested population
      }
    })
    .populate('services.service');
    res.status(200).json(invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ message: 'Failed to fetch invoices', error: error.message });
  }
};