

// Controllers take the request object, pull out data from request, validate, then send to service(s) 

// in this case, this is the controller for users



// Controllers take the request object, pull out data from request, validate, then send to service(s) 

// in this case, this is the controller for users


const UserServices = require("../services/user")

const getUserById = (req,res,next) => {
    return UserServices.findUser(req.params.userId)
    .then((user) => {
        console.log(user, 'has reached the terminal')
        res.json(user)
    })
    .catch(error => res.status(422).json(error))
}

/*
Login
Register
*/


module.exports = {
    getUserById
}