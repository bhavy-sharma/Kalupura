import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    subject: { type: String, required: true },
    msg: { type: String, required: true },
    Status: { type: String, default: "Pending" }
}, { timestamps: true });

const Complaint = mongoose.model("Complaint", complaintSchema);
export default Complaint;