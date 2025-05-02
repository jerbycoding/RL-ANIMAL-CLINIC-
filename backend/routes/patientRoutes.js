import express from "express";
import {
  createPatient,
  getPatientById,
  getAllPatients,
  updatePatient,
  deletePatient,
  getNewPatientsThisMonthCount,
  getSpeciesCount,
  getTopBreeds,
} from "../controllers/patientController.js";

const router = express.Router();

router.post("/", createPatient);
router.get("/", getAllPatients);
router.get("/species-count", getSpeciesCount);
router.get("/top-breeds", getTopBreeds);
router.get('/new/this-month/count',getNewPatientsThisMonthCount);
router.get("/:id", getPatientById);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);

export default router;
