// Controllers take the request object, pull out data from request, validate, then send to service(s) 

// in this case, this is the controller for users

const UserServices = require("../services/user")

const getUserById = (req, res, next) => {
    //return console.log(req.param, 'has reached the terminal')
    return UserServices.findUser(req.params.userId)
         .then((user) => {
             res.json(user)
         })
     .catch(error => next(error))
}

/*
Login
Register
*/

const register = async (req,res, next) => {
    const {name, email, password} = req.body
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
    register
}