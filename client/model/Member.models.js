import mongoose from "mongoose";


const memberSchema=new mongoose.Schema({
    name:{type:String,required:true},
    headOfFamilyName:{type:String,required:false},
    MemberName:[{type:String,required:false}],
    fatherName:{type:String,required:true},
    grandFatherName:{type:String,required:false},
     email:{type:String,required:true,unique:true},
    password:{type:Number,required:true},   
    roomID:{type:String,required:true},
    VillageName:{type:String,required:true},
    phone:{type:Number,required:true},
    dob:{type:String,required:true},
    gender:{type:String,required:true}, 
    occupation:{type:String,required:true},
     hasVehicle:{type:Boolean,default:false},
    vehicleType:[{type:String,enum:['bike', 'car', 'truck', 'bus'],required:false}],
    vehicleNumber:[{type:String,required:false}], 
     maritalStatus:{type:String,enum:['single', 'married', 'divorced', 'widowed'],required:true},
    qualification:{type:String,required:true}, 
    role:{type:String,enum: ["headOfFamily", "admin"],required:true},
    AadhaarNumber:{type:Number,required:true},
    PencardNumber:{type:Number,required:true},
    isEnable:{type:Boolean,default:null}
},{timestamps:true})

const Member=mongoose.model("Member",memberSchema);

export default Member;