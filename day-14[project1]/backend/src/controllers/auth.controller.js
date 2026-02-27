const jwt = require('jsonwebtoken');
// const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');

async function regesterController(req, res) {
    const { userName, email, password, bio, profileImage } = req.body;

    const isUserExists = await userModel.findOne({
        $or: [
            { userName },
            { email }
        ]
    })
    if (isUserExists) {
        return res.status(409).json({
            message: "The User already exist. " + (isUserExists.email === email ? "Email already exists" : "Username already exists")
        })
    }

    // const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({ userName, email, password: hashedPassword, bio, profileImage });
    const token = jwt.sign({ userID: user._id, userName: user.userName }, process.env.JWT_TOKEN, { expiresIn: '1d' });
    res.cookie('token', token);

    res.status(201).json({
        message: "New User created...",
        user: {
            userName: user.userName,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        },
        token
    })
}

async function loginController(req, res) {
    const { userName, email, password } = req.body;

    const isUserExists = await userModel.findOne({
        $or: [
            { userName: userName },
            { email: email }
        ]
    });

    if (!isUserExists) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    // const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    // const isPasswordMatch = hashedPassword === isUserExists.password;

    const isPasswordMatch = await bcrypt.compare(password, isUserExists.password);
    if (!isPasswordMatch) {
        return res.status(401).json({
            message: "Passowrd wrong"
        })
    }

    const token = jwt.sign({ userID: isUserExists._id, userName: isUserExists.userName }, process.env.JWT_TOKEN, { expiresIn: '1d' });
    res.cookie("token", token);
    res.status(200).json({
        message: "User Found and Logined",
        user: {
            userName: isUserExists.userName,
            email: isUserExists.email,
            bio: isUserExists.bio,
            profileImage: isUserExists.profileImage
        }
    })
}

module.exports = {
    regesterController,
    loginController
}