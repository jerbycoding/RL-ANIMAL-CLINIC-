import express from "express";
import {
  getTestsByPatientId,
  getAllTests,
  createTest,
  updateTest,
  deleteTest,
} from "../controllers/testController.js";

const router = express.Router();

router.get("/", getAllTests);
router.get("/:id", getTestsByPatientId);
router.post("/", createTest);
router.put("/:id", updateTest);
router.delete("/:id", deleteTest);

export default router;