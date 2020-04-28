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

const findFriendship = async (requesterId,addresseeId) =>{
    const Friendship = await db.Friendship.findOne({where: {requesterID:requesterId,addresseeID:addresseeId}});
    console.log(Friendship + 'found');
    return Friendship;
}
module.exports = {
    createFriendship,
    findFriendship
}