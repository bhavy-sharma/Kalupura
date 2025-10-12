import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
    MemberName: { type: String, required: true },
    HeadOfFamilyName: { type: String, required: true },
    PhoneNumber: { type: Number, required: true },
    Complaint: { type: String, required: true },
    VillageName: { type: String, required: true },
    Date: { type: Date, default: Date.now },
    Status: { type: String, default: "Pending" }
},{timestamps: true  });

const Complaint = mongoose.model("Complaint", complaintSchema);
export default Complaint;