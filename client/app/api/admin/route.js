import { connectDB } from "@/lib/mongodb";
import Member from "@/models/Member.models";

export const POST = async (request) => {
    try {
         await connectDB();
        const {HeadOfFamily,MemberName,roomID,VillageName,phoneNumber,age,gender,occupation,role,AadhaarNumber,PencardNumber}=await request.json();

        if(!HeadOfFamily || !roomID || !VillageName || !phoneNumber || !age || !gender || !occupation || !role || !AadhaarNumber || !PencardNumber){
            return new Response(JSON.stringify({message:"All fields are required"}),{status:400})
        }
        
        const newMember=await Member.create({
            HeadOfFamily,MemberName,roomID,VillageName,phoneNumber,age,gender,occupation,role,AadhaarNumber,PencardNumber
        })

        return new Response(JSON.stringify(newMember),{status:201})
       

    } catch (error) {
        return new Response(JSON.stringify({message:"Internal Server Error"}),{status:500})
        
    }
}