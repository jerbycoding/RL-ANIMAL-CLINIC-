import {Owner} from "../models/models.js"
import {Patient} from "../models/models.js"
export const getOwnerById = async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.id);
    if (!owner) return res.status(404).json({ error: "Owner not found" });
    res.status(200).json(owner);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllOwners = async (req, res) => {
  try {
    const owners = await Owner.find();
    res.status(200).json(owners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPatientsByOwner = async (req, res) => {
  try {
    const patients = await Patient.find({ owner: req.params.id });
    if (!patients.length) return res.status(404).json({ message: "No patients found for this owner" });
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateOwner = async (req, res) => {
  try {
    const updatedOwner = await Owner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOwner) return res.status(404).json({ error: "Owner not found" });
    res.status(200).json({ message: "Owner updated successfully", updatedOwner });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deleteOwner = async (req, res) => {
  try {
    const deletedOwner = await Owner.findByIdAndDelete(req.params.id);
    if (!deletedOwner) return res.status(404).json({ error: "Owner not found" });
    res.status(200).json({ message: "Owner deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createOwner = async (req, res) => {
  try {
    const owner = new Owner(req.body);
    await owner.save();
    res.status(201).json(owner);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
