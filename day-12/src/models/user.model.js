const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: String,
    userEmailID: {
        type: String,
        unique: [true, "This emailID is in use..."]
    },
    userPassword: String,
})

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;