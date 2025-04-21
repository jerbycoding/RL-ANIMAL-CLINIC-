import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import ownerRoutes from "./routes/ownerRoutes.js";
import patientRoutes from "./routes/patientRoutes.js"
import testRoutes from './routes/testRoutes.js';
import examRoutes from "./routes/examRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import shopRoutes from "./routes/shopRoutes.js";
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Default Route
app.use('/api/auth', authRoutes);
// ------------------ Owner Routes ------------------
app.use("/owners", ownerRoutes);
// ------------------ Patient Routes ------------------
app.use("/patients", patientRoutes);
// ------------------ Test Routes ------------------
app.use("/tests", testRoutes);
// ------------------ Exam Routes ------------------
app.use("/exams", examRoutes);
// ------------------ Staff Routes ------------------
app.use("/staff", staffRoutes);
// ------------------ Appointment Routes ------------------
app.use("/appointments", appointmentRoutes);
// ------------------ Appointment Routes ------------------
app.use("/inventory", inventoryRoutes);
app.use("/invoices", invoiceRoutes);
app.use("/shop", shopRoutes);




// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
