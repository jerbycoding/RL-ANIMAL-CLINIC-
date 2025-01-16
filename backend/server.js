import express from 'express'
import mongoose from 'mongoose'

// import Employee from './database/db_employee_schema.js';
import Inventory from './database/db_inventory_schema.js';
import patientRoute from './routes/patients/patient.js';
import ownerRoute from './routes/owners/owners.js';
const app = express();
app.use(express.json());
app.use('/owner',ownerRoute);
app.use('/patient', patientRoute)


app.get('/inventories', async(req,res)=>{
    try{
        const items = await Inventory.find({});
        res.status(200).json({items})
    }catch(err){
        res.send(err.message)
    }
})
app.post('/inventories', async(req,res)=>{
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
app.get('/inventories/food', async(req,res)=>{
    try{
       
        const food = await Inventory.find({category : "food"});
        res.status(200).json(food);
    }catch(err){
        
        res.send(err.message);
    }
})
app.get('/inventories/medication', async(req,res)=>{
    try{
      
        const medication = await Inventory.find({category:"medication"})
        res.status(200).json({medication});
        
    }catch(err){
        res.send(err.message);  
    }
})
app.get('/inventories/:id',async(req,res)=>{
    try{
        const {id} = req.params
        const item = await Inventory.findById(id)
        return res.status(200).json(item)
    }catch(err){
        return res.status(400).json({message:err.message})
    }
})



app.put('/inventories/:id', async (req,res)=>{
    try{
        const {id} = req.params;
        const update = req.body;
        const item = await Inventory.findByIdAndUpdate(id,update);
        return res.status(200).json({message:"success" , data: item});
    }catch(err){
        return res.status(400).json({message : err.message});
    }
})

app.delete('/inventories/:id', async(req,res)=>{
    try{
        const {id} = req.params;
        await Inventory.findByIdAndDelete(id);
        return res.json({message:"success"})        
    }catch(err){
        return res.status(400).json({message: err.message})
    }
})

// app.get('/employees', async(req,res)=>{
//     try{
//         const employees = await Employee.find({});
//         return res.status(200).json({employees});
//     }catch(err){
//         return res.status(400).json({message: err.message});
//     }
// })
// // app.post('/employees',async(req,res)=>{
// //     try{
// //         const data = req.body;
// //         const employee = {
// //             {
// //                 firstName: ,
// //                 lastName: ,
// //                 role: ,
// //                 contactInformation: {
// //                     email: , 
// //                     phone: , 
// //                 },
        
// //                 associatedPatients: [ ],
// //                 dateHired: , 
// //                 isActive: , 
// //                 notes: , 
// //             }
// //         } 
// //     }catch(err){
// //         return res.status(400).json({message:err.message})
// //     }
// // })
// app.get('employees/:id',async(req,res)=>{
//     try{
//         const {id} =req.params
//         const employee = await employee.findById(id)
//         return res.status(200).json(employee)
//     }catch(err){
//         return res.status(400).json({message:err.message});
//     }
// })
mongoose.connect('mongodb+srv://jerbyyi:xdpp8irbU5OABbXV@cluster0.rk5vp.mongodb.net/RL?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    app.listen(5000, ()=>{
        console.log('http://localhost:5000')
    })
}).catch((err)=>{
    console.log(err.message);
})

