const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: 
    {
      type: String, 
      required: true 
    },
    email: 
    { 
        type: String,
         required: true,
         unique: true },
    password:
    { 
        type: String,
        required: true, 
        maxLength:10

    },
    role: 
    { 
        type: String,
        enum: ["manager", "employee"], 
        required: true },
    phone: 
    {
         type: String,
         required: true 
    },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
