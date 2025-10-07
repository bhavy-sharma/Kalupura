// models/Family.js
const familySchema = new mongoose.Schema({
  familyId: { type: String, unique: true, required: true }, 
  headUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});