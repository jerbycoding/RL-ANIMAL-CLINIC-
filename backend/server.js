import express from 'express'
import mongoose from 'mongoose'



import patientRoute from './routes/patients/patient.js';
import ownerRoute from './routes/owners/owners.js';
import inventoriesRoute from './routes/inventories/inventories.js';
import employeeRoute from './routes/employee/employee.js'
const app = express();
app.use(express.json());
app.use('/owner',ownerRoute);
app.use('/patient', patientRoute)
app.use('/inventories', inventoriesRoute)
app.use('/employee',employeeRoute)


mongoose.connect('mongodb+srv://jerbyyi:xdpp8irbU5OABbXV@cluster0.rk5vp.mongodb.net/RL?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    app.listen(5000, ()=>{
        console.log('http://localhost:5000')
    })
}).catch((err)=>{
    console.log(err.message);
})

