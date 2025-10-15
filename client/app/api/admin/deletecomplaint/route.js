import { connectDB } from "@/lib/mongodb";
import Complaint from "@/model/Contact.models";

export const POST = async (request) => {
  try {
    await connectDB();

    const { id } = await request.json();
    console.log("id:",id)
    if (!id) {
      return new Response(JSON.stringify({ message: "ID is required" }), { status: 400 });
    }

    const deletedComplaint = await Complaint.findByIdAndDelete(id);
    console.log("Deleted complaint:", deletedComplaint); // Debugging line

    if (!deletedComplaint) {
      return new Response(JSON.stringify({ message: "Complaint not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Complaint deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
};
