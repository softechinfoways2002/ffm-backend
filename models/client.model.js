const clientSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true
    },
    phone:
    {
        type: String,
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
    createdBy:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Client", clientSchema);
