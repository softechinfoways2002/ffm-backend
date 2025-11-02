const mongoose = require("mongoose");

const reimbursementSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  billImage: { type: String }, // store image URL (from Cloudinary or local)
  status: { 
    type: String, 
    enum: ["pending", "approved", "rejected"], 
    default: "pending" 
  },
  adminRemark: { type: String }, // optional comment by admin
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Reimbursement", reimbursementSchema);

