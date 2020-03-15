// Controllers take the request object, pull out data from request, validate, then send to service(s) 

// in this case, this is the controller for users

const UserServices = require("../services/user")

const getUserById = (req, res, next) => {
    return UserServices.findUser(req.params.userId)
        .then((user) => {
            res.json(user)
        })
        .catch(error => res.status(422).json(error))
}

/*
Login
Register
*/

const register = async (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    try {
        const hashedPassword = await UserServices.generateHash(password)
        const user = {name, email, password: hashedPassword}
        const createUser = UserServices.createUser(user)
        res.json(createUser)
    } catch(err) {
        return res.status(422).json(err)
    }
}

module.exports = {
    getUserById,
    register
}