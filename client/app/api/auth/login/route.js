import { connectDB } from "@/lib/mongodb"
import Member from "@/model/Member.models";

export const POST = async (request) => {
    try {
        await connectDB();
        const {email, password}= await request.json();
        if (!email || !password) {
            return new Response(JSON.stringify({ message: "Email and Password are required" }), { status: 400 });
        }
        // Assuming User model is already imported
        const user=await Member.findOne({ email, password });
        if (!user) {
            return new Response(JSON.stringify({ message: "Invalid email or password" }), { status: 401 });
        }
       
        return new Response(JSON.stringify({ message: "Login successful" }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}