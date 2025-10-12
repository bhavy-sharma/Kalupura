import { connectDB } from "@/lib/mongodb";
import Complaint from "@/model/Complaint.models";

export const POST = async (request) => {
   try {
    await connectDB();
    const { MemberName,HeadOfFamilyName,PhoneNumber,Complaint,VillageName}= await request.json();
    if (!MemberName || !HeadOfFamilyName || !PhoneNumber || !Complaint || !VillageName) {
       return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 })
    }
    const newComplaint = await Complaint.create({ MemberName, HeadOfFamilyName,PhoneNumber, Complaint, VillageName })
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