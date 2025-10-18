import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    msg: { type: String, required: true },
    name: { type: String, required: true },
    time: { type: String, required: true },
    date: { type: String, required: true },
}, { timestamps: true })

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;