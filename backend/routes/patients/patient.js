import express from 'express'
import {body,validationResult} from 'express-validator';
import patientInformation from '../../database/db_patient_schema.js'
const router = express.Router();
router.get('/',async(req,res)=>{
    try{
        const owners = await patientInformation.find({});
        res.status(200).json({data :owners})
    }catch(err){
        res.status(500).json({})
    }
    
})
router.post('/',[
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
router.get('/:id',async(req,res)=>{
    const {id} =req.params;
    const patients = await patientInformation.findById(id);
    res.status(200).json(patients); 
})

router.put('/:id',async(req,res)=>{
    const {id} = req.params;
    const update = req.body; 
    const owner = await patientInformation.findByIdAndUpdate(id,update);
    res.status(200).send('Update Succesfully')
});
router.delete('/:id',async(req,res)=>{
    try{
        const {id}= req.params;
        await patientInformation.findByIdAndUpdate(id, {deleteAt : new Date()});
        res.status(200).send('Soft Delete Succesfully')
    }catch(err){
        res.staus(400).send('Delete Failed')
    }
})
export default router