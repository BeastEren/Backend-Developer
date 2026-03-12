const express = require("express");
const userController = require('../controllers/user.controller');
const identifyUser = require('../middlewares/auth.middleware');

const userRoutes = express.Router();

userRoutes.post('/follow/:userName', identifyUser, userController.followUserController) //unused
userRoutes.post('/unFollow/:userName', identifyUser, userController.unfollowUserController); //unused
userRoutes.post('/followResponse', identifyUser, userController.followResponseController) //unused

module.exports = userRoutes;