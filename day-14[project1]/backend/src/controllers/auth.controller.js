const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const userModel = require('../models/user.model');

async function regesterController(req, res) {
    const { username, email, password, bio, profileInage } = req.body;

    const isUserExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })
    if (isUserExists) {
        return res.status(409).json({
            message: "The User already exist. " + (isUserExists.email === email ? "Email already exists" : "Username already exists")
        })
    }

    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    const user = await userModel.create({ username, email, password: hashedPassword, bio, profileInage });
    const token = jwt.sign({ userID: user._id }, process.env.JWT_TOKEN, { expiresIn: '1d' });
    res.cookie('token', token);

    res.status(201).json({
        message: "New User created...",
        user: {
            userName: user.username,
            email: user.email,
            bio: user.bio,
            profileInage: user.profileInage
        },
        token
    })
}

async function loginController(req, res) {
    const { username, email, password } = req.body;

    const isUserExists = await userModel.findOne({
        $or: [
            { username: username },
            { email: email }
        ]
    });

    if (!isUserExists) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    const isPasswordMatch = hashedPassword === isUserExists.password;
    if (!isPasswordMatch) {
        return res.status(401).json({
            message: "Passowrd wrong"
        })
    }

    const token = jwt.sign({ userID: isUserExists._id }, process.env.JWT_TOKEN, { expiresIn: '1d' });
    res.cookie("token", token);
    res.status(200).json({
        message: "User Found and Logined",
        user: {
            userName: isUserExists.username,
            email: isUserExists.email,
            bio: isUserExists.bio,
            profileInage: isUserExists.profileInage
        }
    })
}

module.exports = {
    regesterController,
    loginController
}