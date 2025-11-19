const mongoose = require("mongoose");
const attendanceSchema = new mongoose.Schema({
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    checkIn:
    {
        type: Date
    },
    checkOut:
    {
        type: Date
    },
    date:
    {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
