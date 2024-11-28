import mongoose from "mongoose";
const doctorSchema= new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true, unique:true},
    password:{type:String,required:true},
    image:{type:String,required:true},
    speciality:{type:String,required:true},
    degree:{type:String,required:true},
    experience:{type:String,required:true},
    about:{type:String,required:true},
    available:{type:Boolean, default:true},
    fees:{type:Number,required:true}, 
    address:{type:Object,required:true},
    date:{type:Number, required:true},
    slots_booked:{type:Object,default:{}},
},{minimize:false})
//minimise:false:: [the minimize option controls whether empty objects in a document are removed or not when the document is saved to the database] 
//Default Behavior (minimize: true)
// set minimize: false, empty objects will not be removed and will remain in the document when saved

const doctorModel = mongoose.models.doctor || mongoose.model('doctor',doctorSchema)

export default doctorModel