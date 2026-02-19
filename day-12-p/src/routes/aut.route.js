const express = require('express');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const autRoute = express.Router();

autRoute.post('/reg', async (req, res) => {
    const { userName, userEmailID, userPassword } = req.body;

    const doesUSerExist = await userModel.findOne({ userEmailID });
    console.log(doesUSerExist);
    if (doesUSerExist) {
        return res.status(409).json({
            message: 'LOL the emailID is already taken'
        })
    }

    const hashPassword = crypto.createHash('sha256').update(userPassword).digest('hex');

    const userReg = await userModel.create({ userName, userEmailID, userPassword: hashPassword });
    const token = jwt.sign({ userID: userReg._id }, process.env.JWT_TOKEN, { expiresIn: '1h' });
    res.cookie('token_jwt', token);

    res.status(201).json({
        message: 'Nice U are REGISTERED now',
        userReg,
        token
    })
})

autRoute.get('/get-me', async (req, res) => {
    try {
        const token = req.cookies && req.cookies.token_jwt;
        if (!token) return res.status(401).json({ message: 'No token provided' });

        let payload;
        try {
            payload = jwt.verify(token, process.env.JWT_TOKEN);
        } catch (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const user = await userModel.findById(payload.userID);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({
            message: 'found the user',
            user: user.userName,
            email: user.userEmailID
        });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
})

autRoute.post('/login', async (req, res) => {
    const { userEmailID, userPassword } = req.body;

    const user = await userModel.findOne({ userEmailID });
    if (!user) {
        return res.status(404).json({
            message: 'no user of this email'
        })
    }
    const hashPassword = crypto.createHash('sha256').update(userPassword).digest('hex');

    const passs = user.userPassword === hashPassword;
    if (!passs) {
        return res.status(401).json({
            message: 'password wrong'
        })
    }

    const token = jwt.sign({ userID: user._id }, process.env.JWT_TOKEN, { expiresIn: '1h' });
    res.cookie('token_jwt', token);

    res.status(200).json({
        message: 'Nice U are LOGGED IN now',
        user: {
            userName: user.userName,
            userEmailID: user.userEmailID
        },
        token
    })

})
module.exports = autRoute;