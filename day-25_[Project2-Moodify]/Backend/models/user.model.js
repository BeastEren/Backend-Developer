const mongoose = require('mongoose');

const userSchima = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username must be unique"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email must be unique"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false
    }
});

// userSchima.pre("save", async function (next) { });
// userSchima.post("save", async function (next) { });

const userModel = mongoose.model('users', userSchima);

module.exports = userModel;