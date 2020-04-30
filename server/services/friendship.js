const db = require('../models')
const { Op } = require("sequelize");

const createFriendship = async (data) => {
    const newFriendship = await db.Friendship.create({
        requesterID: data.requesterId,
        addresseeID: data.addresseeId,
        friendshipStatus: 1

    });
    console.log("service has created a friendship " + newFriendship);
    return newFriendship;
}

const findFriendship = async (requesterId, addresseeId) => {
    const Friendship = await db.Friendship.findOne({
        where:
        {
            requesterID: requesterId,
            addresseeID: addresseeId
        }
    });
    console.log(Friendship + 'found');
    return Friendship;
}

const findMyFriends = async (userID) => {
    userID = parseFloat(userID);
    try {
        myFriends = await db.Friendship.findAll({
            where: {
                // returns any duplicates (ie, two people sent a request to each other at the same time)
                [Op.or]: [
                    {
                        addresseeID: userID,
                        friendshipStatus: 2
                    },
                    {
                        requesterID: userID,
                        friendshipStatus: 2
                    }
                ]
            }
        });
        console.log("Service: Friends found");
        return myFriends;
    }
    catch (err) {
        console.log("Sericve error: " + err);
    }
}

const findFriendRequests = async (userID) => {
    userID = parseFloat(userID);
    try {
        const FriendRequests = await db.Friendship.findAll({
            where:
            {
                addresseeID: userID,
                friendshipStatus: 1
            }
        });
        console.log("Friend Requests found: " + { FriendRequests });
        return FriendRequests;
    }
    catch (err) {
        console.log("service error: " + err)
    }
}

const findSentRequests = async (userID) => {
    userID = parseFloat(userID);
    try {
        const sentRequests = await db.Friendship.findAll({
            where:
            {
                requesterID: userID,
                friendshipStatus: 1
            }
        });
        console.log("Sent Requests found: " + { sentRequests });
        return sentRequests;
    }
    catch (err) {
        console.log("service error: " + err)
    }
}

const acceptRequest = async (requesterId, addresseeId) => {
    requesterId = parseFloat(requesterId);
    addresseeId = parseFloat(addresseeId);

    try {
        const acceptedRequest = await db.Friendship.update({
            friendshipStatus: 2
        }, {
            where: {
                requesterID: requesterId,
                addresseeID: addresseeId
            }
        });
        console.log("Request accepted");
        return acceptedRequest;
    }
    catch (err) {
        console.log("service error: " + err)
    }
}


// can send the ID's in any order with this function
const deleteFriendship = async (requesterId, addresseeId) => {
    requesterId = parseFloat(requesterId);
    addresseeId = parseFloat(addresseeId);

    try {
        noFriendship = await db.Friendship.destroy({
            where: {
                // deletes any duplicates (ie, two people sent a request to each other at the same time)
                [Op.or]: [
                    {
                        addresseeID: addresseeId,
                        requesterID: requesterId
                    },
                    {
                        addresseeID: requesterId,
                        requesterID: addresseeId
                    }
                ]
            }
        });
        console.log("Service: Friendship deleted");
        return noFriendship;
    }
    catch (err) {
        console.log("Sericve error: " + err);
    }
}

module.exports = {
    createFriendship,
    findFriendship,
    findMyFriends,
    findFriendRequests,
    findSentRequests,
    acceptRequest,
    deleteFriendship
}