import mongoose from 'mongoose'

// Owner Schema
const ownerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contactNumber: { type: String, required: true }
});

// Patient Schema
const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  sex: { type: String, enum: ["Male", "Female"], required: true },
  breed: { type: String, required: true },
  species: { type: String, required: true },
  color: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Owner", required: true }
});

// Test Schema
const testSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  testDate: { type: Date, default: Date.now },
  bloodTest: {
    hemoglobin: Number,
    rbcCount: Number,
    wbcCount: Number,
    plateletCount: Number,
    glucose: Number
  },
  distemperTest: { type: String, enum: ["Positive", "Negative"] },
  earSwabTest: {
    infection: { type: Boolean },
    bacteriaPresent: { type: Boolean }
  },
  ehrlichiaTest: { type: String, enum: ["Positive", "Negative"] },
  heartwormTest: { type: String, enum: ["Positive", "Negative"] },
  parvoTest: { type: String, enum: ["Positive", "Negative"] },
  skinScraping: {
    mitesDetected: { type: Boolean },
    fungalInfection: { type: Boolean }
  },
  stoolExam: {
    parasitesPresent: { type: Boolean },
    bacteriaPresent: { type: Boolean },
    bloodInStool: { type: Boolean }
  },
  ultrasoundFindings: { type: String },
  urineExam: {
    phLevel: Number,
    proteinInUrine: { type: Boolean },
    bacteriaPresent: { type: Boolean }
  },
  vaginalSmear: {
    bacterialInfection: { type: Boolean },
    yeastInfection: { type: Boolean }
  },
  xRayFindings: { type: String },
  vaccinations: {
    kennelCough: { type: Boolean },
    kennelCoughDate: { type: Date },
    mycoplasmaVaccine: { type: Boolean },
    mycoplasmaVaccineDate: { type: Date }
  },
  dentalProphylaxis: {
    done: { type: Boolean },
    notes: { type: String }
  }
});

// Physical Exam Schema
const physicalExamSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  examDate: { type: Date, default: Date.now },
  generalCondition: { type: String, enum: ["N", "AB", "NE"], required: true },
  generalAttitude: { type: String, enum: ["N", "AB", "NE"], required: true },
  hydration: { type: String, enum: ["N", "AB", "NE"], required: true },
  mucous: { type: String, enum: ["N", "AB", "NE"], required: true },
  headNeck: { type: String, enum: ["N", "AB", "NE"], required: true },
  eyes: { type: String, enum: ["N", "AB", "NE"], required: true },
  ears: { type: String, enum: ["N", "AB", "NE"], required: true },
  gastrointestinal: { type: String, enum: ["N", "AB", "NE"], required: true },
  urogenitals: { type: String, enum: ["N", "AB", "NE"], required: true },
  respiratory: { type: String, enum: ["N", "AB", "NE"], required: true },
  circulatory: { type: String, enum: ["N", "AB", "NE"], required: true },
  musculoskeletal: { type: String, enum: ["N", "AB", "NE"], required: true },
  lymphNodes: { type: String, enum: ["N", "AB", "NE"], required: true },
  venousReturn: { type: String, enum: ["N", "AB", "NE"], required: true },
  integumentarySkin: { type: String, enum: ["N", "AB", "NE"], required: true }
});

// Abnormal Description Schema
const abnormalDescriptionSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  description: { type: String, required: true },
  weight: { type: Number, required: true },
  temperature: { type: Number, required: true },
  respiration: { type: Number, required: true },
  pulse: { type: Number, required: true }
});

// Staff
const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ["Veterinarian", "Assistant", "Receptionist"], required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String },
  schedule: [
    {
      day: { type: String, enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] },
      shiftStart: { type: String }, // Example: "08:00 AM"
      shiftEnd: { type: String }, // Example: "04:00 PM"
    }
  ],
  specialization: { type: String }, // For Veterinarians (e.g., "Dentistry")
});
const appointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  vet: { type: mongoose.Schema.Types.ObjectId, ref: "Staff", required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true }, // Example: "10:00 AM"
  endTime: { type: String, required: true },  // Example: "11:00 AM"
  purpose: { type: String, required: true },  // Example: "Vaccination"
  status: { type: String, enum: ["Scheduled", "Completed", "Cancelled"], default: "Scheduled" },
  notes: { type: String }
});





// Export Models
const Owner = mongoose.model("Owner", ownerSchema);
const Patient = mongoose.model("Patient", patientSchema);
const Test = mongoose.model("Test", testSchema);
const PhysicalExam = mongoose.model("PhysicalExam", physicalExamSchema);
const AbnormalDescription = mongoose.model("AbnormalDescription", abnormalDescriptionSchema);
const Staff = mongoose.model("Staff", staffSchema);
const Appointment = mongoose.model("Appointment", appointmentSchema);

export{ Owner, Patient, Test, PhysicalExam, AbnormalDescription , Staff, Appointment};
