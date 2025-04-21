import express from "express";
import {
  createAppointment,
  getAllAppointments,
  updateAppointment,
  deleteAppointment,
  updateAppointmentStatus,
  checkConflict,
  getAvailableVets,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/", createAppointment);
router.get("/", getAllAppointments);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);
router.put("/:id/status", updateAppointmentStatus);

router.post("/check-conflict", checkConflict);
router.post("/available-vets", getAvailableVets);

export default router;
