const FriendshipServices = require("../services/friendship")

const createFriendship = async (req, res, next) => {
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


module.exports = {
    createFriendship
}