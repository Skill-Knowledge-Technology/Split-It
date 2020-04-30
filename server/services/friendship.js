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

const deleteFriendship = async (requesterId, addresseeId) => {
    requesterId = parseFloat(requesterId);
    addresseeId = parseFloat(addresseeId);

    try {
        noFriendship = await db.Friendship.destroy({
            where: {
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
    findFriendRequests,
    deleteFriendship
}