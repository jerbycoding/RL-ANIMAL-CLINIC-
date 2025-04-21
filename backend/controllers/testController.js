import {Test} from '../models/models.js';

export const getTestsByPatientId = async (req, res) => {
  try {
    const tests = await Test.find({ patient: req.params.id }).populate("patient");
    res.status(200).json(tests.length > 0 ? tests : []);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tests", details: err.message });
  }
};

export const getAllTests = async (req, res) => {
  try {
    const tests = await Test.find().populate("patient");
    res.status(200).json(tests);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tests", details: err.message });
  }
};

export const createTest = async (req, res) => {
  try {
    const test = new Test(req.body);
    await test.save();
    res.status(201).json(test);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateTest = async (req, res) => {
  try {
    const test = await Test.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!test) {
      return res.status(404).json({ error: "Test not found" });
    }
    res.status(200).json(test);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteTest = async (req, res) => {
  try {
    const test = await Test.findByIdAndDelete(req.params.id);
    if (!test) {
      return res.status(404).json({ error: "Test not found" });
    }
    res.status(200).json({ message: "Test deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
