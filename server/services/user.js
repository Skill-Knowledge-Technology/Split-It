// In the services folder, we want to be able to query data from our database,
// in this case we will be querying data from the user 

const db = require("../models/index")
// bcrypt being used to hash & compare passwords
var bcrypt = require('bcrypt');

const findUserByEmail = async (email) => {
    const User = await db.User.findOne({ where: { email: email } })
    return User
}


const findUser = async (id) => {
    const User = await db.User.findByPk(id)
    return User
    
}


const createUser = async (data) => {
    const newUser = await db.User.create({
        name: data.name,
        email: data.email,
        password: data.password
    })
    return newUser
}


// function to generate a hash of the password asynchronously with 8 rounds
const generateHash = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

module.exports = {
    findUserByEmail,
    findUser,
    createUser,
    generateHash,
}
