import express from 'express'
import Inventory from './database/db_inventory_schema.js';
const router = express.Router();
router.get('/', async(req,res)=>{
    try{
        const items = await Inventory.find({});
        res.status(200).json({items})
    }catch(err){
        res.send(err.message)
    }
})
router.post('/', async(req,res)=>{
    try{
        const data = req.body;
        const item = {
            itemName : data.itemName,
            category : data.category,
            quantity : data.quantity,
            unit : data.unit,
            pricePerUnit : data.pricePerUnit,
            expirationDate : data.expirationDate,
            supplier : {name : data.supplier.name, contactNumber : data.supplier.contactNumber},
            notes : data.note
        }
        const inventory = new Inventory(item);
        await inventory.save();
        return res.status(201).json({message:"success"})
    }catch(err){
        res.send(err.message);
    }
})
router.get('/food', async(req,res)=>{
    try{
       
        const food = await Inventory.find({category : "food"});
        res.status(200).json(food);
    }catch(err){
        
        res.send(err.message);
    }
})
router.get('/medication', async(req,res)=>{
    try{
      
        const medication = await Inventory.find({category:"medication"})
        res.status(200).json({medication});
        
    }catch(err){
        res.send(err.message);  
    }
})
router.get('/:id',async(req,res)=>{
    try{
        const {id} = req.params
        const item = await Inventory.findById(id)
        return res.status(200).json(item)
    }catch(err){
        return res.status(400).json({message:err.message})
    }
})



router.put('/:id', async (req,res)=>{
    try{
        const {id} = req.params;
        const update = req.body;
        const item = await Inventory.findByIdAndUpdate(id,update);
        return res.status(200).json({message:"success" , data: item});
    }catch(err){
        return res.status(400).json({message : err.message});
    }
})

router.delete('/:id', async(req,res)=>{
    try{
        const {id} = req.params;
        await Inventory.findByIdAndDelete(id);
        return res.json({message:"success"})        
    }catch(err){
        return res.status(400).json({message: err.message})
    }
})