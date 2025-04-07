import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { Owner, Patient, Test, PhysicalExam, AbnormalDescription ,Staff, Appointment} from "./Schema/models.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Default Route
app.get("/", (req, res) => {
  res.send("Veterinary Clinic API is running...");
});

// ------------------ Owner Routes ------------------

// Get Specific Owner

app.get("/owners/:id", async (req, res) => {
    try {
      const owner = await Owner.findById(req.params.id);
      if (!owner) {
        return res.status(404).json({ error: "Owner not found" });
      }
      res.status(200).json(owner);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // Get All Owners
app.get("/owners", async (req, res) => {
    const owners = await Owner.find();
    res.json(owners);
  });


  // Get all patients by owner ID
app.get("/owners/:id/patients", async (req, res) => {
  try {
    const ownerId = req.params.id;
    const patients = await Patient.find({ owner: ownerId });

    if (!patients || patients.length === 0) {
      return res.status(404).json({ message: "No patients found for this owner" });
    }

    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Update Owner by ID
app.put("/owners/:id", async (req, res) => {
    try {
      const updatedOwner = await Owner.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true, runValidators: true } 
      );
  
      if (!updatedOwner) {
        return res.status(404).json({ error: "Owner not found" });
      }
  
      res.json(updatedOwner);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  //Delete Owner 
  app.delete("/owners/:id", async (req, res) => {
    try {
      const deletedOwner = await Owner.findByIdAndDelete(req.params.id);
  
      if (!deletedOwner) {
        return res.status(404).json({ error: "Owner not found" });
      }
  
      res.json({ message: "Owner deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  


app.post("/owners", async (req, res) => {
  try {
    const owner = new Owner(req.body);
    await owner.save();
    res.status(201).json(owner);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



// ------------------ Patient Routes ------------------

// Create Patient
app.post("/patients", async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Patients

app.get("/patients", async (req, res) => {
  const patients = await Patient.find().populate("owner");
  res.json(patients);
});

// Get Patient
app.get("/patients/:id", async (req, res) => {
    try {
      const patient = await Patient.findById(req.params.id).populate("owner");
      if (!patient) {
        return res.status(404).json({ error: "Patient not found" });
      }
      res.status(200).json(patient);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  

// ------------------ Test Routes ------------------



//Get ID Test 
app.get("/tests/:id", async (req, res) => {
    try {
      const test = await Test.findById(req.params.id).populate("patient");
      if (!test) {
        return res.status(404).json({ error: "Test not found" });
      }
      res.status(200).json(test);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
// Get All Tests
app.get("/tests", async (req, res) => {
  const tests = await Test.find().populate("patient");
  res.json(tests);
});
//Create Test
app.post("/tests", async (req, res) => {
    try {
      const test = new Test(req.body);
      await test.save();
      res.status(201).json(test);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
// Update Test
app.put("/tests/:id", async (req, res) => {
    try {
      const test = await Test.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!test) {
        return res.status(404).json({ error: "Test not found" });
      }
      res.status(200).json(test);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
app.delete("/tests/:id", async (req, res) => {
    try {
      const test = await Test.findByIdAndDelete(req.params.id);
      if (!test) {
        return res.status(404).json({ error: "Test not found" });
      }
      res.status(200).json({ message: "Test deleted successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
});

// ------------------ Physical Exam Routes ------------------

// Create Physical Exam
app.post("/physical-exams", async (req, res) => {
  try {
    const physicalExam = new PhysicalExam(req.body);
    await physicalExam.save();
    res.status(201).json(physicalExam);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Physical Exams
app.get("/physical-exams/:id", async (req, res) => {
    try {
      const exam = await PhysicalExam.findById(req.params.id).populate("patient");
      if (!exam) return res.status(404).json({ error: "Physical exam not found" });
      res.json(exam);
    } catch (err) {
      res.status(400).json({ error: "Invalid ID format" });
    }
  });
app.get("/physical-exams", async (req, res) => {
  const exams = await PhysicalExam.find().populate("patient");
  res.json(exams);
});

// Update Physical Exam
app.put("/physical-exams/:id", async (req, res) => {
    try {
      const updatedExam = await PhysicalExam.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true, runValidators: true } // Returns updated document and enforces validation
      );
      if (!updatedExam) return res.status(404).json({ error: "Exam not found" });
      res.json(updatedExam);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  app.delete("/physical-exams/:id", async (req, res) => {
    try {
      const deletedExam = await PhysicalExam.findByIdAndDelete(req.params.id);
      if (!deletedExam) return res.status(404).json({ error: "Exam not found" });
      res.json({ message: "Physical exam deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

// ------------------ Abnormal Description Routes ------------------
app.get("/abnormal-descriptions/:id", async (req, res) => {
    try {
      const description = await AbnormalDescription.findById(req.params.id).populate("patient");
  
      if (!description) {
        return res.status(404).json({ error: "Abnormal Description not found" });
      }
  
      res.json(description);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
// Create Abnormal Description
app.post("/abnormal-descriptions", async (req, res) => {
  try {
    const abnormal = new AbnormalDescription(req.body);
    await abnormal.save();
    res.status(201).json(abnormal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Abnormal Descriptions
app.get("/abnormal-descriptions", async (req, res) => {
  const abnormalities = await AbnormalDescription.find().populate("patient");
  res.json(abnormalities);
});




// Get Staff 

// Create Staff
app.post("/staff", async (req, res) => {
  try {
    const staff = new Staff(req.body);
    await staff.save();
    res.status(201).json(staff);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Staff
app.get("/staff", async (req, res) => {
  try {
    const staffList = await Staff.find();
    res.status(200).json(staffList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Staff
app.put("/staff/:id", async (req, res) => {
  try {
    const updatedStaff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedStaff);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete Staff
app.delete("/staff/:id", async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//APPOINTMENT

app.post("/appointments/available-vets", async (req, res) => {
  const { date, startTime, endTime } = req.body;

  try {
    // Fetch all veterinarians
    const allVets = await Staff.find({ role: "Veterinarian" });

    // Fetch appointments that overlap with the given date and time
    const conflictingAppointments = await Appointment.find({
      date: date,
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } } // Conflicting times
      ]
    }).populate("vet");

    // Get IDs of busy veterinarians
    const busyVetIds = conflictingAppointments.map((appointment) => appointment.vet._id.toString());

    // Filter available vets
    const availableVets = allVets.filter((vet) => !busyVetIds.includes(vet._id.toString()));

    res.status(200).json(availableVets);
  } catch (error) {
    console.error("Error fetching available vets:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/appointments/check-conflict", async (req, res) => {
  const { vet, date, startTime, endTime } = req.body;

  try {
    const conflictingAppointments = await Appointment.find({
      vet: vet,
      date: date,
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } } // Overlapping appointments
      ]
    });

    if (conflictingAppointments.length > 0) {
      res.status(200).json({ conflict: true, conflicts: conflictingAppointments });
    } else {
      res.status(200).json({ conflict: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.put("/appointments/:id/status", async (req, res) => {
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
});


// Create Appointment
app.post("/appointments", async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Appointments
app.get("/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient")
      .populate("vet");
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Appointment
app.put("/appointments/:id", async (req, res) => {
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
});

// Delete Appointment
app.delete("/appointments/:id", async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});






// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
