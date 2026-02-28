const express = require("express");
const userController = require('../controllers/user.controller');
const identifyUser = require('../middlewares/auth.middleware');

const userRoutes = express.Router();

userRoutes.post('/follow/:userName', identifyUser, userController.followUserController)
userRoutes.post('/unFollow/:userName', identifyUser, userController.unfollowUserController);
userRoutes.post('/follow/response',identifyUser,userController.followResponseController)

module.exports = userRoutes;