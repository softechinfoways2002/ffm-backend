const reimbursementSchema = new mongoose.Schema({
    user:
        { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    meeting:
        { type: mongoose.Schema.Types.ObjectId, ref: "Meeting" },
    distanceCovered:
        { type: Number, required: true },
    amount:
        { type: Number, required: true },
    status:
        { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    description: {
        type: String
    }
},
    { timestamps: true });

module.exports = mongoose.model("Reimbursement", reimbursementSchema);
