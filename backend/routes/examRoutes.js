import express from "express";
import {
  createExam,
  getAllExams,
  getExamsByPatientId,
  updateExam,
  deleteExam,
} from "../controllers/examController.js";

const router = express.Router();

router.post("/", createExam);
router.get("/", getAllExams);
router.get("/:id", getExamsByPatientId);
router.put("/:id", updateExam);
router.delete("/:id", deleteExam);

export default router;
