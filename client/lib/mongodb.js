import mongoose from "mongoose";

export const connectDB=async()=>{
    try {
        console.log("id of db",process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected");
    } catch (error) {
        console.log("Database connection error",error);
        
    }
}