// Controllers take the request object, pull out data from request, validate, then send to service(s) 

// in this case, this is the controller for users

const UserServices = require("../services/user")

const getUserById = (req, res, next) => {
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
const signupUser = (req, res, next) => {
    const { body } = req;
    const { password } = body.password;
    let { email } = body.email;

    // check that email is empty
    if (!email) {
        return res.send({
            success: false,
            message: "Error. Must enter an email"
        });
    }

    // check that password is non-empty
    if (!password) {
        return res.send({
            success: false,
            message: 'Error. Must enter a password'
        });
    }

    // eliminating whitespace and caps from email
    email = email.toLowerCase();
    email = email.trim();


    // first check that email entered does not already exist, then save user if it is new
    

}




module.exports = {
    getUserById,
    signupUser
}