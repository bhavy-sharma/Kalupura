import { connectDB } from "@/lib/mongodb";
import Member from "@/model/Member.models";

export const POST = async (request) => {
    try {
        await connectDB();
        const { HeadOfFamily, MemberName, email, password, roomID, VillageName, phoneNumber, age, gender, occupation, role, AadhaarNumber, PencardNumber } = await request.json();

        if (!HeadOfFamily || !roomID || !VillageName || !phoneNumber || !age || !gender || !occupation || !role || !AadhaarNumber || !PencardNumber || !email || !password) {
            return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 })
        }

        const newMember = await Member.create({
            HeadOfFamily, MemberName, email, password, roomID, VillageName, phoneNumber, age, gender, occupation, role, AadhaarNumber, PencardNumber
        })

        return new Response(JSON.stringify(newMember), { status: 201 })


    } catch (error) {
        console.error("Full error:", error); 
        return new Response(
            JSON.stringify({ message: "Internal Server Error", error: error.message }),
            { status: 500 }
        );

    }
}

export const GET = async (request) => {
    try {
        await connectDB();
        const members = await Member.find();
        return new Response(JSON.stringify(members), { status: 201 })
    } catch (error) {
        return new Response(
            JSON.stringify({ message: "Internal Server Error", error: error.message }),
            { status: 500 }
        );
    }
}