const Imageket = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs');
const jwt = require('jsonwebtoken');
const postModel = require('../models/post.model');

const imageKit = new Imageket({
    privatekey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req, res) {
    // console.log(req.body, req.file);

    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: 'cohort-2/insta-clone/posts'
    })

    const postData = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.userID //"req.user" is equal to "decode" coming from middleware
    })

    console.log('====================================');
    console.log(file);
    console.log('====================================');

    res.status(201).json({
        message: 'Post created successfully',
        postData
    })
}

async function getPostController(req, res) {

    const allUserPost = await postModel.find({ user: req.user.userID });

    res.status(200).json({
        message: 'Post fetched sccessfully',
        allUserPost
    })
}

async function getPostDetailsController(res, res) {

    const userID = req.user.userID;
    const postID = req.params.postID;

    const postData = await postModel.findById(postID);

    if (!postData) {
        return res.status(404).json({
            message: 'Post not found'
        })
    }

    const isValidUser = postData.user.toString() === userID;
    if (!isValidUser) {
        return res.status(403).json({
            message: "Forbidden Content"
        })
    }

    res.status(200).json({
        message: "Post fetched Successfully",
        postData
    })
}

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
};