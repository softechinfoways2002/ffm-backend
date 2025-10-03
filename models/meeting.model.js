const meetingSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
        required: true
    },
    manager:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    employee:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    meetingDate:
    {
        type: Date,
        required: true
    },
    latitude:
    {
        type: String,
        required: true
    },
    longitude:
    {
        type: String,
        required: true
    },
    status:
    {
        type: String,
        enum: ["scheduled", "completed", "cancelled"],
        default: "scheduled"
    }
}, { timestamps: true });

module.exports = mongoose.model("Meeting", meetingSchema);
