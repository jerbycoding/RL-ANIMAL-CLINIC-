import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const inventorySchema = new Schema(
    {
 
        deletedAt: { type: Date, default: null }, 
    },
    { timestamps: true } 
);

const Inventory = model('Inventory', inventorySchema);

export default Inventory;
