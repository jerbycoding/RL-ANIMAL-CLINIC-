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
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Owner", required: true },
  registrationDate: { type: Date, default: Date.now } // Added registrationDate field with default value
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

});

const examSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  examDate: {
    type: Date,
    default: Date.now,
  },
  // Abnormal Descriptions
  description: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  respiration: {
    type: Number,
    required: true,
  },
  pulse: {
    type: Number,
    required: true,
  },
  // Physical Exam Flags (N, AB, NE)
  generalCondition: {
    type: String,
    enum: ["N", "AB", "NE"],
    required: true,
  },
  generalAttitude: {
    type: String,
    enum: ["N", "AB", "NE"],
    required: true,
  },
  hydration: {
    type: String,
    enum: ["N", "AB", "NE"],
    required: true,
  },
  mucous: {
    type: String,
    enum: ["N", "AB", "NE"],
    required: true,
  },
  headNeck: {
    type: String,
    enum: ["N", "AB", "NE"],
    required: true,
  },
  eyes: {
    type: String,
    enum: ["N", "AB", "NE"],
    required: true,
  },
  ears: {
    type: String,
    enum: ["N", "AB", "NE"],
    required: true,
  },
  gastrointestinal: {
    type: String,
    enum: ["N", "AB", "NE"],
    required: true,
  },
  urogenitals: {
    type: String,
    enum: ["N", "AB", "NE"],
    required: true,
  },
  respiratory: {
    type: String,
    enum: ["N", "AB", "NE"],
    required: true,
  },
  circulatory: {
    type: String,
    enum: ["N", "AB", "NE"],
    required: true,
  },
  musculoskeletal: {
    type: String,
    enum: ["N", "AB", "NE"],
    required: true,
  },
  lymphNodes: {
    type: String,
    enum: ["N", "AB", "NE"],
    required: true,
  },
  venousReturn: {
    type: String,
    enum: ["N", "AB", "NE"],
    required: true,
  },
  integumentarySkin: {
    type: String,
    enum: ["N", "AB", "NE"],
    required: true,
  },
}, { timestamps: true });



// Staff
const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ["Veterinarian", "Assistant"], required: true },
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
  startTime: { type: String, required: true }, 
  endTime: { type: String, required: true },  
  purpose: { type: String, required: true },  
  status: { type: String, enum: ["Scheduled", "Completed", "Cancelled"], default: "Scheduled" },
  notes: { type: String }
});

const inventorySchema = new mongoose.Schema({ 
  name: {
    type: String,
    required: true, // Name of the inventory item
    trim: true,
  },
  category: {
    type: String,
    enum: ["Medicine", "Food"],
    required: true, // Define categories for items
  },
  quantity: {
    type: Number,
    required: true, // Total stock available
    min: 0, // Prevent negative stock
  },
  unitPrice: {
    type: Number,
    required: true, // Price per unit for the item
  },
  supplier: {
    type: String, // Supplier name
    default: "Unknown",
    trim: true,
  },
  expirationDate: {
    type: Date, // Only for items with expiration (e.g., medicines, vaccines)
    default: null,
  },
  type: {
    type: String, // For additional details (e.g., dog food type: "Dry", "Wet")
    default: null,
    trim: true,
  },
  notes: {
    type: String, // Additional notes (e.g., special storage instructions)
    trim: true,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now, // Track when the item was added to the inventory
  },
});

const shopInvoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true },
  items: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inventory',
        required: true,
      },
      name: String,
      category: String,
      quantity: Number,
      unitPrice: Number,
      totalPrice: Number,
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});



const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true },
  dateIssued: { type: Date, default: Date.now, required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  services: [
    {
      service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    },
  ],
  totalAmount: { type: Number, required: true },

});




const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name of the service (e.g., Consultation, Vaccination - Rabies, Spay)
    trim: true,

  },
  category: {
    type: String,
    enum: ["Consultation", "Vaccination", "Surgery", "Dental", "Laboratory", "Imaging", "Grooming"],
    required: true, // Categorize services for easier management and reporting
  },
  description: {
    type: String,
    trim: true,
    default: "", // Optional description of the service
  },
  charge: {
    type: Number,
    required: true, // The standard fee for this service
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});








const Invoice= mongoose.model('Invoice', InvoiceSchema);

const Exam = mongoose.model("Exam", examSchema);
const Shop = mongoose.model('ShopInvoice', shopInvoiceSchema);



const Service= mongoose.model("Service", serviceSchema);


const Owner = mongoose.model("Owner", ownerSchema);
const Patient = mongoose.model("Patient", patientSchema);
const Test = mongoose.model("Test", testSchema);

const Staff = mongoose.model("Staff", staffSchema);
const Appointment = mongoose.model("Appointment", appointmentSchema);
const Inventory =  mongoose.model("Inventory", inventorySchema);

export{ Owner, Patient, Test, Exam , Staff, Appointment, Inventory,Invoice, Service,Shop};
