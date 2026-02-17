const mongoose = require('mongoose');

const userSchima = new mongoose.Schema({
    userName: String,
    userEmailID: {
        type: String,
        unique: [true, "LOL the emailID is already taken"]
    },
    userPassword: String
})

const userModel = mongoose.model("users", userSchima);

module.exports = userModel;