// Controllers take the request object, pull out data from request, validate, then send to service(s) 

// in this case, this is the controller for users

const UserServices = require("../services/user")
const bcrypt = require('bcrypt')
const secretorKey = 'secret'

const getUserById = (req, res, next) => {
    return UserServices.findUser(req.params.userId)
        .then((user) => {
            res.json(user)
        })
        .catch(error => next(error))
}


const login = async (req,res,next) => {
    const payload = {
        id: req.user.userID,
        name: req.user.name
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
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    try {
        const hashedPassword = await UserServices.generateHash(password)
        const user = {name, email, password: hashedPassword}
        const createUser = UserServices.createUser(user)
        res.json(createUser)
    } catch(err) {
        next(error)
    }
}

module.exports = {
    getUserById,
    register,
    login
}