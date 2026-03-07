const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    postID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        required: [true, 'PostId is required']
    },
    userName: {
        type: String,
        required: [true, 'Username is required']
    }
}, { timestamps: true });

likeSchema.index({ postID: 1, userName: 1 }, { unique: true });

const likeModel = mongoose.model('likes', likeSchema);

module.exports = likeModel;