import express from 'express'
import mongoose from 'mongoose'

// import Employee from './database/db_employee_schema.js';

import patientRoute from './routes/patients/patient.js';
import ownerRoute from './routes/owners/owners.js';
const app = express();
app.use(express.json());
app.use('/owner',ownerRoute);
app.use('/patient', patientRoute)
app.use('/inventories', inventoriesRoute)



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

