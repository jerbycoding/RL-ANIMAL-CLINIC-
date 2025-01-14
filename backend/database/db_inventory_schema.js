import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const inventorySchema = new Schema(
    {
        itemName: { type: String, required: true, trim: true }, 
        category: {
            type: String,
            enum: ['medication', 'food'], 
            required: true,
        },
        quantity: { type: Number, required: true, min: 0 }, 
        unit: { type: String, enum: ['pcs', 'bottles', 'packs', 'ml', 'kg'], required: true }, 
        pricePerUnit: { type: Number, required: true, min: 0 }, 
        expirationDate: { type: Date, required: function () { return this.category === 'medication'; } }, 
        supplier: {
            name: { type: String, required: true },
            contactNumber: { type: String, required: true },
        },
        notes: { type: String, trim: true, default: '' }, 
        deletedAt: { type: Date, default: null }, 
    },
    { timestamps: true } 
);

const Inventory = model('Inventory', inventorySchema);

export default Inventory;
