// Controllers take the request object, pull out data from request, validate, then send to service(s) 

// in this case, this is the controller for users

const UserServices = require("../services/user")

const getUserById = (req, res, next) => {
    return UserServices.findUser(req.params.userId)
        .then((user) => {
            console.log(user, 'has been found')
            res.json(user)
        })
        .catch(error => res.status(422).json(error))
}

/*
Login
Register
*/

/*
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
    UserServices.findUserByEmail({
        email: email
    }, (err, exisingUser) => {
        if (err) {
            return res.send({
                success: false,
                message: "Error. Server Error"
            });
        }
        else if (exisingUser.length > 0) {
            return res.send({
                success: false,
                message: "An account with that email already exists."
            });
        }

        // Save new user
        // const newUser = UserServices.createUser()
    });

};
*/

const register = async (req, res) => {
    // console.log(req.body);
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    // console.log(name + " " + email + " " + password + " have been sent to controller");
    try {
        const hashedPassword = await UserServices.generateHash(password)
        console.log("hashed password is " + hashedPassword);
        const user = {name, email, password: hashedPassword}
        const createUser = UserServices.createUser(user)
        res.json(createUser)
        console.log("user register working - new user " + user.name + "being created");
    } catch(err) {
        return res.status(422).json(err)
    }
}

module.exports = {
    getUserById,
    register
}