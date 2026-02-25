const Imageket = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs');
const jwt = require('jsonwebtoken');
const postModel = require('../models/post.model');

const imageKit = new Imageket({
    privatekey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req, res) {
    // console.log(req.body, req.file);

    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({
            message: 'Token not provided'
        })
    }

    let decoded = null;
    try {
        decoded = jwt.verify(token, process.env.JWT_TOKEN);
    }
    catch (err) {
        return res.status(401).json({
            message: 'User is not authorized',
            err
        })
    }

    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: 'cohort-2/insta-clone/posts'
    })

    const postData = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: decoded.userID
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
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Token not Found"
        })
    }

    let decoded = null;
    try {
        decoded = jwt.verify(token, process.env.JWT_TOKEN);
    } catch (err) {
        return res.status(401).json({
            message: "User token not Valid"
        })
    }

    const allUserPost = await postModel.find({ user: decoded.userID });

    res.status(200).json({
        message: 'Post fetched sccessfully',
        allUserPost
    })
}

async function getPostDetailsController(res, res) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Token not found"
        })
    }

    let decord = null;
    try {
        decord = jwt.verify(token, process.env.JWT_TOKEN);
    } catch (err) {
        return res.status(401).json({
            message: "User token invalid"
        })
    }

    const userID = decord.userID;
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