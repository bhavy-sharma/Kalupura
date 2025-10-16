import mongoose from "mongoose";

const specialEventSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
}, { timestamps: true });

const SpecialEvent = mongoose.model("SpecialEvent", specialEventSchema);

export default SpecialEvent;