import express from 'express'
import Employee from '../../database/db_employee_schema.js'
const router = express.Router();
router.get('/', async(req,res)=>{
    try{
        const employees = await Employee.find({});
        return res.status(200).json({employees});
    }catch(err){
        return res.status(400).json({message: err.message});
    }
})
router.post('/',async(req,res)=>{
    try{
        const data = req.body;
        const employee= new Employee(data)
        await employee.save()
        return res.status(201).send('success');
    }catch(err){
        return res.status(400).json({message:err.message})
    }
})
router.get('/:id',async(req,res)=>{
    try{
        const {id} =req.params
        const employee = await Employee.findById(id)
        return res.status(200).json(employee)
    }catch(err){
        return res.status(400).json({message:err.message});
    }
})
router.put('/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const data = req.body;
        const update = await Employee.findByIdAndUpdate(id, data);
        return res.status(200).send('hello world')
    }catch(err){
        return res.status(400).send(err.message);
    }
})
router.delete('/:id',async (req,res)=>{
    try{
        const {id}  = req.params;
        const data = req.body;
        await Employee.findByIdAndDelete(id)
        return res.status(200).send('success');
    }catch(err){
        return res.status(400).send('error');
    }
})
export default router