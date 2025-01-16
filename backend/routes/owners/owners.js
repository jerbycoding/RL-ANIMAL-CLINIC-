import express from 'express'
import ownerInformation from '../../database/db_owner_schema.js';
import {body,validationResult} from 'express-validator';
const router = express.Router();

router.get('/',async(req,res)=>{
    try{
        const owners = await ownerInformation.find({});
        res.status(200).json({data :owners})

    }catch(err){
        res.send(message.err);
    }
})
router.post('/',
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
router.get('/:id',async(req,res)=>{
    const {id} = req.params;
    const owner = await ownerInformation.findById(id);
    res.status(200).json(owner)
})

router.put('/:id', async(req,res)=>{
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
router.delete('/:id', async (req,res)=>{
    try{
        const{id}=req.params
        await ownerInformation.findByIdAndDelete(id)
        return res.status(200).send('Delete Succesfully');
    }catch(err){
        return res.status(200).send(err.message)
    }
})
export default router;