const mongoose = require('mongoose');

const followerSchema = new mongoose.Schema({
    followers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "Follower is required"]
    },
    followee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "Followee is required"]
    }
}, {
    timestamps: true
});

const followerModel = mongoose.model('follows', followerSchema);

module.exports = followerModel;