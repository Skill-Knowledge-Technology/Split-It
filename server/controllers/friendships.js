const FriendshipServices = require("../services/friendship")

const createFriendship = async (req, res) => {
    let requesterId = req.body.requesterID;
    let addresseeId = req.body.addresseeID;
    const friendship = { requesterId, addresseeId };
    try {
        const createFriendship = FriendshipServices.createFriendship(friendship)
        res.json(createFriendship)
        console.log('friendship created ')
    }
    catch (err) {
        console.log('friendship controller error')
    }


}
const getFriendship = async (req, res, next) => {
    return FriendshipServices.findFriendship(req.params.requesterId, req.params.addresseeId)
        .then((friendship) => {
            res.json(friendship)
        })
        .catch(error => next(error))
}

const getMyFriends = async(req, res) => {
    return FriendshipServices.findMyFriends(req.params.userId)
    .then((myFriends) => {
        res.json(myFriends)
    })
    .catch((error) => {
        console.log("controller error: " + error)
    })
}

const getMyFriendRequests = async (req, res) => {
    return FriendshipServices.findFriendRequests(req.params.userId)
        .then((friendRequests) => {
            res.json(friendRequests)
        })
        .catch((error) => {
            console.log("controller error: " + error)
        })
}

const getSentRequests = async (req, res) => {
    return FriendshipServices.findSentRequests(req.params.userId)
    .then((sentRequests) => {
        res.json(sentRequests)
    })
    .catch((error) => {
        console.log("controller error: " + error)
    })
}

const acceptRequest = async (req, res) => {
    return FriendshipServices.acceptRequest(req.params.requesterId, req.params.addresseeId)
    .then((accepted) => {
        res.json(accepted)
    })
    .catch((error) => {
        console.log("controller error: " + error)
    })
}

const removeFriendship = async (req, res) => {
    return FriendshipServices.deleteFriendship(req.params.requesterId, req.params.addresseeId)
        .then((deletedFriendship) => {
            res.json(deletedFriendship)
        })
        .catch((error) => {
            console.log("controller error: " + error)
        })
}

module.exports = {
    createFriendship,
    getFriendship,
    getMyFriends,
    getMyFriendRequests,
    getSentRequests,
    acceptRequest,
    removeFriendship
}