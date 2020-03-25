// In the services folder, we want to be able to query data from our database,
// in this case we will be querying data from the user 

const db = require("../models")
// bcrypt being used to hash & compare passwords
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_OPTIONS = {
    expiresIn: 31556926,
  };
const secretOrPrivateKey = 'secret';


// function that accepts an payload of type object 
// and creates a token of type string
const getJwtToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secretOrPrivateKey, JWT_OPTIONS, (err, token) => {
            return err ? reject(err) : resolve(token);
        });
    });
};



// function that verify and decode a JWT token back to its original object
const verifyJwtToken = (token) => {
    return new Promise((resolve,reject)=> {
        jwt.verify(token ,secretOrPrivateKey, (err, decoded) => {
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

const findUserByName =async (name) => {
    const User = await db.User.findOne({where:{ name:name }})
    console.log(User + 'has been found by name in service');
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

module.exports = {
    findUserByEmail,
    findUser,
    createUser,
    generateHash,
    getJwtToken,
    verifyJwtToken,
    findUserByName
}
