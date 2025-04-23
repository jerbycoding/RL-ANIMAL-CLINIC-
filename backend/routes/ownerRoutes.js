import express from "express";
import {
  getAllOwners,
  getOwnerById,
  getPatientsByOwner,
  createOwner,
  updateOwner,
  deleteOwner
} from "../controllers/ownerController.js";

const router = express.Router();

router.get("/", getAllOwners);
router.get("/:id", getOwnerById);
router.get("/:id/patients", getPatientsByOwner);
router.post("/", createOwner);
router.patch("/:id", updateOwner);
router.delete("/:id", deleteOwner);
export default router;