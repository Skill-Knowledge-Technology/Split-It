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
    console.log("CONTROLLER: user you are trying to search is " + req.params.username);
    return UserServices.findUserByUsername(req.params.username)
        .then((user) => {
            res.json(user)
        })
        .catch(error => next(error))
}

const getUserByEmail = (req, res, next) => {
    return UserServices.findUserByEmail(req.params.email)
    .then((user) => {
        res.json(user)
    })
    .catch(error => next(error))
}

const updateEmail = (req, res, next) => {
    return UserServices.updateUserEmail(req.params.userId, req.body.newEmail)
    .then((data) => {
        res.json(data)
    })
    .catch(error => next(error))
}

const updateName = (req, res, next) => {
    return UserServices.updateUserName(req.params.userId, req.body.newUserName)
    .then((data) => {
        res.json(data)
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
    if (isNaN(req.body.balanceToAdd)) {
        return console.log(balanceToAdd + " is not a number")
    }
    else {
        req.body.balanceToAdd = parseFloat(req.body.balanceToAdd).toFixed(2);
        return UserServices.addBalance(req.body.userId, req.body.balanceToAdd)
            .then((balance) => {
                res.json(balance)
            })
            .catch(error => next(error))
    }
}

const transferUserBalance = (req, res, next) => {
    return UserServices.transferBalancetoUsers(req.params.senderId,
        req.body.receiverId,
        req.body.balanceToTransfer,
        req.body.transactionId)
        .then((balance) => {
            res.json(balance)
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
    getUserByEmail,
    updateEmail,
    updateName,
    getUserBalance,
    addToUserBalance,
    transferUserBalance,
    register,
    login

}