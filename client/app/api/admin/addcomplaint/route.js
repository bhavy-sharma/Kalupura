import { connectDB } from "@/lib/mongodb";
import Complaint from "@/model/Contact.models";

export const POST = async (request) => {
   try {
    await connectDB();
    const {name,email,phone,subject, msg}= await request.json();
    if (!name || !email || !phone || !subject || !msg) {
       return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 })
    }
    const newComplaint = await Complaint.create({ name,email,phone,subject, msg });
    return new Response(JSON.stringify(newComplaint), { status: 201 })
   } catch (error) {
     console.error(error);
     return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 })
    
   }
}

export const GET = async () => {
    try {
        await connectDB();
        const complaints = await Complaint.find();
        return new Response(JSON.stringify(complaints), { status: 200 })
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 })
    }
}