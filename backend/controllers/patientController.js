import {Patient} from '../models/models.js';
import {Invoice} from '../models/models.js';
import {Appointment} from '../models/models.js';

export const createPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate("owner");
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate("owner");
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePatient = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedPatient = await Patient.findByIdAndUpdate(id, updates, {
      new: true,
    }).populate("owner");

    if (!updatedPatient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    res.status(200).json({
      message: "Patient updated successfully",
      updatedPatient,
    });
  } catch (error) {
    console.error("Update patient error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deletePatient = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Patient.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Patient not found" });
    }

    await Invoice.updateMany({ patient: id }, { $set: { patient: null } });
    await Appointment.updateMany({ patient: id }, { $set: { patient: null } });

    res.status(200).json({ message: "Patient deleted. Related data updated." });
  } catch (error) {
    console.error("Error deleting patient:", error);
    res.status(500).json({ message: "Server error" });
  }
};
