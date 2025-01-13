import mongoose from 'mongoose'

const {Schema,model} = mongoose;

const ownerInformationSchema =  new Schema({
    name:{
            first: {type:String, required: true},
            middle: {type:String, required: true},
            last: {type:String, required: true},
        },
    contactInformation: {
            email: {type: String, match:/.+\@.+\..+/, unique : true }, 
            contactNumber : {type:String ,required:true}
        },
    patients : [{_id : {type:Schema.Types.ObjectId}}],
    notes:{type:String, default: ''}
},{timestamps: true})

const ownerInformation =model('ownerInformation', ownerInformationSchema);
export default ownerInformation;  