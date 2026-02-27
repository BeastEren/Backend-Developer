const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: [true, "User name already exist"],
        required: [true, "User name is required"]
    },
    email: {
        type: String,
        unique: [true, "Email already exist"],
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    bio: String,
    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/gt4igjutv/user-default.jpg" // For some reason it's not working...?
    }
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel; 