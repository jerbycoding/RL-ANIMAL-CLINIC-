import {Exam} from "../models/models.js";

export const createExam = async (req, res) => {
  try {
    const newExam = new Exam(req.body);
    const saved = await newExam.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Failed to create exam", error: err.message });
  }
};

export const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find().populate("patient");
    res.status(200).json(exams);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch exams", error: err.message });
  }
};

export const getExamsByPatientId = async (req, res) => {
  try {
    const exams = await Exam.find({ patient: req.params.id }).populate("patient");
    res.status(200).json(exams.length > 0 ? exams : []);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch exams", error: err.message });
  }
};

export const updateExam = async (req, res) => {
  try {
    const updated = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Exam not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: "Failed to update exam", error: err.message });
  }
};

export const deleteExam = async (req, res) => {
  try {
    const deleted = await Exam.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Exam not found" });
    res.status(200).json({ message: "Exam deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete exam", error: err.message });
  }
};
