import mongoose from 'mongoose'

const {Schema, model} = mongoose


const patientInformationSchema = new Schema({
    ownerID : {type: Schema.Types.ObjectId, ref : 'ownerInformation', required: true},
    name : {type: String, required : true},
    species : {type:String, required: true , enum : ['dog', 'cat']},
    breed : {type:String },
    age : {type:Number , min : 0, required:true},
    gender: {type:String, enum:['male','female','unknown'] , required:true},
    weight: {type:Number, min : 0},
    vaccination:[
        {   
            vaccine : {type:String},
            veterinarian : {type:String},
            body:{type:String},
            date : {type:Date, required: true}
        }
    ],
    allergies : [{type:String, default:[]}],
    medicalHistory : [{type:String, default:[]}],
    currentMedication :[{type:String , default:[]}],
    previousTreatments: [{treatments : {type:String}, veterinarian : {type:String} , body:{type:String}, date:{type:Date, required: true}}],
    appointments : [{date : {type:Date},reason:{type:String, trim:true}, veterinarian :{type:String, trim:true} ,createdAt:{type:Date, default: Date.now}}],
    currentCondition: [{type:String, trim : true}],
    lastCheckUpDate: {type:Date},
    weightHistory : [{weight:{type:Number}, date:{type:Date}}],
    tags:{type:[String], default : []},
    patientCode:{type:String, required: true},
    status:{type:String, enum: ['active', 'inactive', 'deceased'], default:'active'},
    history: [{reason:{type:String}, details:{type:String},date:{type:Date}}],
    deletedAt:{type:Date, default:null},
},{timestamps:true});

const patientInformation = model('patientInformation', patientInformationSchema);
export default patientInformation;