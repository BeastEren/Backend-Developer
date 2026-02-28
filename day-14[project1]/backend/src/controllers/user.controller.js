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

async function followResponseController(req, res) {
    const userFollowee = req.user.userName;
    // const response = req.params.response;
    const { userFollower, response } = req.body;

    if (response !== 'accepted' && response !== 'rejected') {
        return res.status(400).json({
            message: "Wrong Response"
        })
    }

    const followData = await followModel.findOne({
        follower: userFollower,
        followee: userFollowee
    });
    if (!followData) {
        return res.status(404).json({
            message: 'No follow request found'
        })
    }
    // if (followData.followee !== req.user.userName) {
    //     return res.status(403).json({
    //         message: "Not authorized to respond"
    //     });
    // } //it will be true 100% of the time
    if (followData.status !== "pending") {
        return res.status(400).json({
            message: "Request already responded"
        });
    }

    const updatedFollow = await followModel.findOneAndUpdate(
        { _id: followData._id },
        { status: response },
        { new: true }
    );
    // const updateStatus = await followModel.findOneAndUpdate({ _id: followData._id }, { status: response });

    res.status(200).json({
        message: `Follow response ${response}`
    })
}

module.exports = {
    followUserController,
    unfollowUserController,
    followResponseController
}