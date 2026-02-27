const followModel = require('../models/follow.model')
const userModel = require('../models/user.model');

async function followUserController(req, res) {
    const userFollower = req.user.userName;
    const userFollowee = req.params.userName;

    if (userFollower === userFollowee) {
        return res.status(400).json({
            message: 'You cant follow yourself'
        })
    }

    const isFolloweeExists = await userModel.findOne({ userName: userFollowee });
    if (!isFolloweeExists) {
        return res.status(404).json({
            message: "The user you want to follow doesn't exist"
        })
    }

    const isFollowingDataExist = await followModel.findOne({
        follower: userFollower,
        followee: userFollowee
    });
    if (isFollowingDataExist) {
        return res.status(200).json({
            message: `You are already Following ${userFollowee}`
        })
    }

    const followRecord = await followModel.create({
        follower: userFollower,
        followee: userFollowee
    });
    res.status(200).json({
        message: `You are currently following ${userFollowee}`,
        followRecord
    })
}

async function unfollowUserController(req, res) {
    const userFollower = req.user.userName;
    const userFollowee = req.params.userName;

    const isFollowing = await followModel.findOne({
        follower: userFollower,
        followee: userFollowee
    })
    if (!isFollowing) {
        return res.status(400).json({
            message: `You are not following ${userFollowee}`
        })
    }

    const unFollow = await followModel.deleteOne({
        follower: userFollower,
        followee: userFollowee
    });
    // await followerModel.findByIdAndDelete(isFollowing._id); //same same but different

    res.status(200).json({
        message: `Successfully unfollowed ${userFollowee}`
    })
}

module.exports = {
    followUserController,
    unfollowUserController
}