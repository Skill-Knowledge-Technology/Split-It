// Controllers take the request object, pull out data from request, validate, then send to service(s) 

// in this case, this is the controller for users

const UserServices = require("../services/user")
const bcrypt = require('bcrypt')

const getUserById = (req, res, next) => {
    return UserServices.findUser(req.params.userId)
        .then((user) => {
            res.json(user)
        })
        .catch(error => next(error))
}
const getUserByUsername = (req, res, next) => {
    return UserServices.findUserByUsername(req.params.username)
        .then((user) => {
            res.json(user)
        })
        .catch(error => next(error))
}

const getUserBalance = (req, res, next) => {
    return UserServices.findUserBalance(req.params.userId)
        .then((balance) => {
            res.json(balance)
        })
        .catch(error => next(error))
}

const addToUserBalance = (req, res, next) => {
    return UserServices.addBalance(req.params.userId, req.body.balanceToAdd)
        .then((balance) => {
            res.json(balance)
        })
        .catch(error => next(error))
}

const getUserFriends = (req, res, next) => {
    console.log('hit getUserFriend worked');
    return UserServices.findUserFriends(req.params.userId)
        .then((friends) => {
            res.json('friends found ' + friends)
        })
        .catch(error => next(error))

}

const addToUserFriends = (req,res,next) =>{
    console.log('friend add controller hit');
    return UserServices.addFriends(req.params.userId, req.body.friendsId)
        .then((friends) => {
            res.json(friends) 
        })
        .catch(error => next(error))
}

const login = async (req, res, next) => {
    // we are able to get the userID and username because 
    // we passed emailShouldExist middleware and that contains
    // the req.user information
    const payload = {
        id: req.user.userID,
        username: req.user.username
    }
    return UserServices.getJwtToken(payload)
        .then((token) => {
            res.json({
                success: true,
                token: 'Bearer ' + token
            })
        })
        .catch(error => next(error))
}


const register = async (req, res, next) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    try {
        const hashedPassword = await UserServices.generateHash(password)
        const user = { username, email, password: hashedPassword }
        const createUser = UserServices.createUser(user)
        res.json(createUser)
    } catch (err) {
        next(error)
    }
}

module.exports = {
    getUserById,
    getUserByUsername,
    getUserBalance,
    addToUserBalance,
    addToUserFriends,
    getUserFriends,
    register,
    login

}