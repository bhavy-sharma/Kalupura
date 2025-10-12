import mongoose from "mongoose";

const memberSchema=new mongoose.Schema({
    HeadOfFamily:{type:String,required:true},
    MemberName:[{type:String,required:true}],   
    roomID:{type:String,required:true},
    VillageName:{type:String,required:true},
    phoneNumber:{type:String,required:true},
    age:{type:Number,required:true},
    gender:{type:String,required:true}, 
    occupation:{type:String,required:true},  
    role:{type:String,enum:[member,headOFFamily,admin],required:true},
    AadhaarNumber:{type:Number,required:true},
    PencardNumber:{type:Number,required:true},
    isEnable:{type:Boolean,default:null}
},{timestamps:true})

const Member=mongoose.model("Member",memberSchema);

export default Member;