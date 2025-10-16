import mongoose from "mongoose";

const infoVillageSchema=new mongoose.Schema({
    imageUrl:{type:String,required:true},
    title:{type:String,required:true},
    description:{type:String,required:true},
},{timestamps:true})

const InfoVillage=mongoose.model("InfoVillage",infoVillageSchema);
export default InfoVillage;