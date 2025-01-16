import express from 'express'
import mongoose from 'mongoose'
import ownerInformation from './database/db_owner_schema.js';
import patientInformation from './database/db_patient_schema.js';
import Employee from './database/db_employee_schema.js';
import Inventory from './database/db_inventory_schema.js';
import {body,validationResult} from 'express-validator';

const app = express();
app.use(express.json());

app.get('/owners',async(req,res)=>{
    try{
        const owners = await ownerInformation.find({});
        res.status(200).json({data :owners})

    }catch(err){
        res.send(message.err);
    }
})
app.post('/owner',
    [
        body('name.first').notEmpty().withMessage('FirstName is Required'),
        body('name.last').notEmpty().withMessage('LastName is Required'),
        body('email').isEmail().withMessage('email Required'),
        body('contactNumber').isNumeric().withMessage('contact number must be numeric'),
        body('patients').isArray().optional(),
        body('notes').isString().optional().withMessage('Notes must be String')
    ]
    ,async(req,res)=>{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).send(errors);
        }   
        try{
            const data = req.body;
            const ownerProfile = {
                name:{ first: data.name.first, middle: data.name.middle, last: data.name.last},
                contactInformation : { email : data.contactInformation.email, contactNumber : data.contactInformation.contactNumber},
                patients :data.patients.map((value)=>{ return {_id : value}}),
                notes: data.notes}
            const owner = new ownerInformation(ownerProfile);
            await owner.save()
            return res.status(201).json({message: "Success"});
        }catch(err){
            res.status(500).json({message:"server error"});
        }
});
app.get('/owner/:id',async(req,res)=>{
    const {id} = req.params;
    const owner = await ownerInformation.findById(id);
    res.status(200).json(owner)
})

app.put('/owner/:id', async(req,res)=>{
    try{
        const {id} = req.params;
        const update = req.body;
        const updateProfile = await ownerInformation.findByIdAndUpdate(id,update);
        if(!updateProfile){return res.status(404).json({message: 'Profile not found'})};

        return res.status(200).json({message: 'Update Succesfully',data: updateProfile});
    }catch(err){
        return res.status(406).send({message: message.err});
    }
})
app.delete('/owner/:id', async (req,res)=>{
    try{
        const{id}=req.params
        await ownerInformation.findByIdAndDelete(id)
        return res.status(200).send('Delete Succesfully');
    }catch(err){
        return res.status(200).send(err.message)
    }
})  

app.get('/patients',async(req,res)=>{
    try{
        const owners = await patientInformation.find({});
        res.status(200).json({data :owners})
    }catch(err){
        res.status(500).json({})
    }
    
})
app.post('/patient',[
    body('name').notEmpty().withMessage('required Name'),
    body('species').notEmpty().withMessage('required Species'),
    body('breed').notEmpty().withMessage('required'),
    body('age').isNumeric().notEmpty().withMessage('Required Age'),
    body('gender').notEmpty().withMessage('Required Gender'),
],async(req,res)=>{
    try{
        const data = req.body;
        const patientProfile = {
            ownerID : data.ownerID,
            name : data.name,
            species: data.species,
            breed: data.breed,
            age:data.age,
            gender:data.gender,
            weight:data.weight,
            vaccination: data.vaccination.map((value)=>
                {
                    return {
                        vaccine: value.vaccine,
                        veterinarian: value.veterinarian,
                        body: value.body,
                        date: new Date(value.date)
                    }
                }
            ),
            allergies: data.allergies.map((value)=>{
                return value;   
            }),
            medicalHistory :data.medicalHistory.map((value)=>{return value}),
            currentMedication:data.currentMedication.map((value)=>{return value}),
            previousTreatments : data.previousTreatments.map((value)=>{return value}),
            appointments: data.appointments.map((value)=>{
                return {
                            date: value.date,
                            reason:value.reason,
                            veterinarian:value.veterinarian,
                            createdAt: new Date()
                        }
            }),
            currentCondition: data.currentCondition.map((value)=>{return value}),
            lastCheckUpDate: data.lastCheckUpDate,
            weightHistory: data.weightHistory.map((value)=>{
                return {
                        weight: value.weight,
                        date: new Date(value.date)   
                    }
            }),
            tags: data.tags.map((value)=>{return value}),
            patientCode : data.patientCode,
            status: data.status,
            history: data.history.map((value)=>{
                return {
                    reason: value.reason,
                    details:value.details,
                    date: new Date(value.date)
                }
            }),
            deletedAt: data.deletedAt
    
        }
        const patient = new patientInformation(patientProfile);
        await patient.save();
        return res.status(201).send('success');
    }catch(err){
        res.status(400).send(err.message);
    }

})
app.get('/patient/:id',async(req,res)=>{
    const {id} =req.params;
    const patients = await patientInformation.findById(id);
    res.status(200).json(patients); 
})

app.put('/patient/:id',async(req,res)=>{
    const {id} = req.params;
    const update = req.body; 
    const owner = await patientInformation.findByIdAndUpdate(id,update);
    res.status(200).send('Update Succesfully')
});
app.delete('/patient/:id',async(req,res)=>{
    try{
        const {id}= req.params;
        await patientInformation.findByIdAndUpdate(id, {deleteAt : new Date()});
        res.status(200).send('Soft Delete Succesfully')
    }catch(err){
        res.staus(400).send('Delete Failed')
    }
})
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

