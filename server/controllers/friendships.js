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
    return FriendshipServices.findFriendship(req.params.requesterId,req.params.addresseeId)
        .then((friendship) => {
            res.json(friendship)
        })
        .catch(error => next(error))
}


module.exports = {
    createFriendship,
    getFriendship
}