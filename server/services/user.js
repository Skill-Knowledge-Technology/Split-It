

// In the services folder, we want to be able to query data from our database,
// in this case we will be querying data from the user 




// In the services folder, we want to be able to query data from our database,
// in this case we will be querying data from the user 

const db = require("../models")

const findUserByEmail = async (email) => {
    const User = await db.User.findOne({ where: {email: email }})
    return User
}


const findUser = async (id) => {
    const User = await db.User.findByPk(id)
    console.log(User + 'Hello world')
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

module.exports = {
    findUserByEmail,
    findUser,
    createUser
}
