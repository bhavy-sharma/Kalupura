import mongoose from "mongoose";



const vehicleSchema = new mongoose.Schema({
    type: { type: String, required: false },
    numberPlate: { type: String, required: false },
    purchaseDate: { type: String, required: false },
    insuranceExpiry: { type: String, required: false },
});


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    grandfatherName: { type: String },
    grandmotherName: { type: String },
    dob: { type: String },
    dobTime: { type: String },
    qualification: { type: String },
    gender: { type: String, enum: ["male", "female", "other"], default: "male" },
    phoneNumber: { type: String },
    age: { type: Number ,required:true},
    occupation: { type: String },
    maritalStatus: {
        type: String,
        enum: ["single", "married", "divorced", "widowed"],
        default: "single",
    },
    marriageDate: { type: String },
    dharam: { type: String },
    jaati: { type: String },
    hasVehicle: { type: Boolean, default: false },
    vehicleCount: { type: Number, default: 1 },
    vehicles: [vehicleSchema],
    aadharNumber: { type: String },
    panCardNumber: { type: String },
    headOfFamilyName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "headOFFamily", "member"], default: "member" },
   memberOfFamily: { type: [String], default: ["no"] },
    roomId: { type: String,default:"main"},
    isEnabled: { type: Boolean, default: null },
}, { timestamps: true })

const User = mongoose.model("User", userSchema);

export default User;

