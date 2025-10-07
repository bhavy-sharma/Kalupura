// models/User.js
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isHead: { type: Boolean, default: false },
  phoneNumber: { type: String }, // only if isHead: true
  familyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Family', required: true },
  vehicleCount: { type: Number, default: 0 }, // only if isHead
  age: { type: Number }, // only if isHead
  approved: { type: Boolean, default: false }, // admin approval
  createdAt: { type: Date, default: Date.now }
});