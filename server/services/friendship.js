const db = require('../models')

const createFriendship = async (data) => {
    const newFriendship = await db.Friendship.create({
        requesterID: data.requesterId,
        addresseeID: data.addresseeId,
        friendshipStatus : 1

    });
    console.log("service has created a friendship " + newFriendship);
    return newFriendship;
}

module.exports = {
    createFriendship
}