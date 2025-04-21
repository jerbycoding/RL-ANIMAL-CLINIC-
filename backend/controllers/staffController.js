import {Staff} from "../models/models.js";

export const createStaff = async (req, res) => {
  try {
    const staff = new Staff(req.body);
    await staff.save();
    res.status(201).json(staff);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllStaff = async (req, res) => {
  try {
    const staffList = await Staff.find();
    res.status(200).json(staffList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateStaff = async (req, res) => {
  try {
    const updatedStaff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedStaff);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteStaff = async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
