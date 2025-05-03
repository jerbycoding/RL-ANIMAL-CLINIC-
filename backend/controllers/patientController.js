import {Patient} from '../models/models.js';
import {Invoice} from '../models/models.js';
import {Appointment} from '../models/models.js';


export const getSpeciesCount = async (req, res) => {
  try {
    const speciesCounts = await Patient.aggregate([
      {
        $group: {
          _id: '$species',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          species: '$_id',
          count: 1,
        },
      },
    ]);

    // Convert the array of objects to a simple key-value object
    const formattedCounts = speciesCounts.reduce((acc, curr) => {
      acc[curr.species] = curr.count;
      return acc;
    }, {});

    res.json(formattedCounts);
  } catch (error) {
    console.error('Error fetching species counts:', error);
    res.status(500).json({ message: 'Error fetching species counts' });
  }
};

export const getTopBreeds = async (req, res) => {
  try {
    const topBreeds = await Patient.aggregate([
      {
        $group: {
          _id: '$breed',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 5, // You can adjust the number of top breeds to show
      },
      {
        $project: {
          _id: 0,
          breed: '$_id',
          count: 1,
        },
      },
    ]);

    res.json(topBreeds);
  } catch (error) {
    console.error('Error fetching top breeds:', error);
    res.status(500).json({ message: 'Error fetching top breeds' });
  }
};



export const createPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
export const getNewPatientsThisMonthCount = async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const count = await Patient.countDocuments({
      registrationDate: { $gte: startOfMonth, $lte: endOfMonth },
    });
    res.json({ count });
  } catch (error) {
    console.error('Error fetching new patients count:', error);
    res.status(500).json({ message: 'Error fetching count' });
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
