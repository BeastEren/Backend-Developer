const postModel = require('../models/post.model');
// const userModel = require('../models/user.model');
const Imageket = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs');
const jwt = require('jsonwebtoken');

const imageKit = new Imageket({
    privatekey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req, res) {
    // console.log(req.body, req.file);

    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({
            message: 'Token not provided, unauthorized access'
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test"
    })
    // res.send(file);

    const postData = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: decoded.userID
    })

    res.status(201).json({
        message: 'Post created successfully',
        postData
    })
}

module.exports = {
    createPostController,
};