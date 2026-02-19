const express = require('express');
const authController = require("../controllers/auth.controller");

const authRout = express.Router();

authRout.post('/regester', authController.regesterController);
authRout.post('/login', authController.loginController);

module.exports = authRout;