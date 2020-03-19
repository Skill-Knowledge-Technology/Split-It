// In the services folder, we want to be able to query data from our database,
// in this case we will be querying data from the user 

const db = require("../models")
// bcrypt being used to hash & compare passwords
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const JWT_OPTIONS = {
    expiresIn: 31556926,
}

const getJwtToken = (payload) => {
    return new promise((resolve, reject) => {
        jwt.sign(payload, secretorKey, JWT_OPTIONS, (err, token) => {
            return err ? reject(err) : resolve(token);
        });
    });
};

const verifyJwtToken = (token) => {
    return new promise((resolve,reject)=> {
        jwt.verify(token ,secretorKey, (err, decoded) => {
            return err ? reject(err) : resolve(decoded);
        });
    });
};


const findUserByEmail = async (email) => {
    const User = await db.User.findOne({ where: { email: email } })
    return User
}


const findUser = async (id) => {
    const User = await db.User.findByPk(id);
    console.log(User + ' has been found by service');
    return User;
}


const createUser = async (data) => {
    const newUser = await db.User.create({
        name: data.name,
        email: data.email,
        password: data.password
    });
    console.log("service has created a User " + newUser.name);
    return newUser;
    // console.log(data.name + " " + data.email + " " + data.password + " - read from createUser function");
    // console.log("createUser function invoked");
}


// function to generate a hash of the password asynchronously with 8 rounds
const generateHash = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

// function to compare password when signing in
// const validPassword = async (password) => {
//     return bcrypt.compareSync(password, this.password);
// };

module.exports = {
    findUserByEmail,
    findUser,
    createUser,
    generateHash,
    getJwtToken,
    verifyJwtToken
}
