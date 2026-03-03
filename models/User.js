const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+@.+\..+/, "Please enter a valid email"],
    },
    password: {
        type: String,
        required: [true, "password is required"],
        trim: true,
        minLength: [6, "Password must be at least 6 characters"],
    },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
