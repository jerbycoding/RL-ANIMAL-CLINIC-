import {Appointment}from "../models/models.js";
import {Staff} from "../models/models.js";

// Create Appointment
export const createAppointment = async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const getTodayAppointmentsCount = async (req, res) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const count = await Appointment.countDocuments({
      date: { $gte: todayStart, $lte: todayEnd },
    });
    res.json({ count });
  } catch (error) {
    console.error("Error fetching today's appointments count:", error);
    res.status(500).json({ message: 'Error fetching count' });
  }
};
export const getTodayAppointmentsDetails = async (req, res) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const appointments = await Appointment.find({
      date: {
        $gte: todayStart,
        $lte: todayEnd,
      },
    })
      .populate({
        path: 'patient',
        populate: {
          path: 'owner',
          select: 'name', // Assuming your Owner model has a 'name' field
        },
        select: 'name owner',
      })
      .populate('vet', 'name');

    const formattedAppointments = appointments.map(appt => ({
      _id: appt._id,
      startTime: appt.startTime,
      endTime: appt.endTime,
      purpose: appt.purpose,
      patientName: appt.patient.name,
      ownerName: appt.patient.owner ? appt.patient.owner.name : 'N/A', // Access owner's name through nested populate
      vetName: appt.vet ? appt.vet.name : 'N/A',
      status: appt.status,
    }));

    res.json(formattedAppointments);
  } catch (error) {
    console.error('Error fetching today\'s appointments:', error);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
};
// Get All Appointments
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient")
      .populate("vet");

    const validAppointments = appointments.filter(
      (appt) => appt.patient && appt.vet
    );

    res.status(200).json(validAppointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Appointment
export const updateAppointment = async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Appointment
export const deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Status
export const updateAppointmentStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Check for Conflicts
export const checkConflict = async (req, res) => {
  const { vet, date, startTime, endTime } = req.body;

  try {
    const conflicts = await Appointment.find({
      vet,
      date,
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
      ],
    });

    res.status(200).json({
      conflict: conflicts.length > 0,
      conflicts,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Available Vets
export const getAvailableVets = async (req, res) => {
  const { date, startTime, endTime } = req.body;

  try {
    const allVets = await Staff.find({ role: "Veterinarian" });

    const conflictingAppointments = await Appointment.find({
      date,
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
      ],
    }).populate("vet");

    const busyVetIds = conflictingAppointments.map((a) => a.vet._id.toString());

    const availableVets = allVets.filter(
      (vet) => !busyVetIds.includes(vet._id.toString())
    );

    res.status(200).json(availableVets);
  } catch (error) {
    console.error("Error fetching available vets:", error);
    res.status(500).json({ error: error.message });
  }
};
