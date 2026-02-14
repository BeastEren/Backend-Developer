const express = require('express');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const authRouter = express.Router()  // creating a router for auth. related routes and express.Router() allows us to write routs in other file other than app.js and then we can export it and use it in app.js

authRouter.post('/register', async (req, res) => {
    const { userName, userEmailID, userPassword } = req.body;

    const isUserAlreadyExist = await userModel.findOne({ userEmailID });
    if (isUserAlreadyExist) {
        return res.status(409).json({ // 409 is the status code for conflict, which is appropriate when a resource already exists... Where as 400 is for bad request, which is more general and can be used for various types of client errors.
            message: "User with this email already exists. Please login instead."
        })
    }

    const userData = await userModel.create({ userName, userEmailID, userPassword });

    const token = jwt.sign({ userId: userData._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }); // creating a JWT token with the user's ID as the payload, and signing it with a secret key. The token will expire in 1 hour.

    res.cookie('jwt_token', token, { httpOnly: true, secure: true, sameSite: 'Strict' }); // setting the token in a cookie with httpOnly, secure and sameSite options for security.

    res.status(201).json({
        message: "LOL it worked. The u r registered now!!!",
        userData,
        token
    })
})

module.exports = authRouter;