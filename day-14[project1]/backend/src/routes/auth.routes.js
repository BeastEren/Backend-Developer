const express = require('express');
const authController = require("../controllers/auth.controller");
const verifyToken = require('../middlewares/auth.middleware');

const authRouter = express.Router();

authRouter.post('/register', authController.registerController);
authRouter.post('/login', authController.loginController);
authRouter.get('/get-user', verifyToken, authController.getUserController);

module.exports = authRouter;