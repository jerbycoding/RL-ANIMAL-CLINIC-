import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const employeeSchema = new Schema(
    {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        role: {
            type: String,
            enum: ['veterinarian', 'assistant', 'secretary', 'admin'], 
            required: true,
        },
        contactInformation: {
            email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ }, 
            phone: { type: String, required: true, match: /^\d{10,15}$/ }, 
        },

        associatedPatients: [
            { type: Schema.Types.ObjectId, ref: 'patientInformation' }
        ],
        dateHired: { type: Date, required: true }, 
        isActive: { type: Boolean, default: true }, 
        notes: { type: String, trim: true, default: '' }, 
    },
    { timestamps: true } 
);

const Employee = model('Employee', employeeSchema);

export default Employee;