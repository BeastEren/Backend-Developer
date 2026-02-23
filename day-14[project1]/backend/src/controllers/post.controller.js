const postModel = require('../models/post.model');
const imageKit = require('@imagekit/nodejs');
const { toFile } = require('@imagekit/nodejs');
const jwt = require('jsonwebtoken');

const imageKit1 = new Imageket({
    privatekey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req, res) {
    console.log(req.body, req.file);

    const token = req.cookies.token;
    if (!token) {
        res.status(401).kson({
            message: 'Token not provided, unauthorized access'
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    decoded.userID


    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test"
    })

    res.send(file);
}

module.exports = {
    createPostController
};