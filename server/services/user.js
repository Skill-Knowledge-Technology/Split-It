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
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretOrPrivateKey, (err, decoded) => {
            return err ? reject(err) : resolve(decoded);
        });
    });
};


const findUserByEmail = async (email) => {
    const User = await db.User.findOne({ where: { email: email } })
    return User
}

const updateUserEmail = async (id, newEmail) => {
    id = parseFloat(id);
    db.User.update(
        { email: newEmail },
        { where: { userID: id } }
    )
        .then(result =>
            console.log(' result is ' + result)
        )
        .catch(err =>
            console.log(err)
        )
    console.log('try to update email');
}

const updateUserName = async (id, newUserName) => {
    id = parseFloat(id);
    db.User.update(
        { username: newUserName },
        { where: { userID: id } }
    )
        .then(result =>
            console.log(' result is ' + result)
        )
        .catch(err =>
            console.log(err)
        )
    console.log('try to update username');
}


const findUser = async (id) => {
    const User = await db.User.findByPk(id);
    console.log(User + ' has been found by service');
    return User;
}

const findUserBalance = async (userId) => {
    const User = await db.User.findByPk(userId);
    console.log('found user' + User);
    return User.balance;
}

const addBalance = async (userId, balanceToAdd) => {
    balanceToAdd = parseFloat(balanceToAdd);
    console.log('balance to add is ' + balanceToAdd)
    let currentBalance = await findUserBalance(userId);
    currentBalance = parseFloat(currentBalance);
    console.log('current balance is ' + currentBalance);
    let newBalance = currentBalance + balanceToAdd;
    console.log('new balance is ' + newBalance);
    db.User.update(
        { balance: newBalance },
        { where: { userID: userId } }
    )
        .then(result =>
            console.log(' result is ' + result)
        )
        .catch(err =>
            console.log(err)
        )
    console.log('try to add balance');
}

const transferBalancetoUsers = async (senderId, receiverId, balanceTransfered, transactionId) => {
    balanceTransfered = parseFloat(balanceTransfered);
    console.log('balance transfered is ' + balanceTransfered)
    let senderCurrentBalance = await findUserBalance(senderId);
    senderCurrentBalance = parseFloat(senderCurrentBalance);
    let receiverCurrentBalance = await findUserBalance(receiverId);
    receiverCurrentBalance = parseFloat(receiverCurrentBalance);
    let senderNewBalance = senderCurrentBalance - balanceTransfered;
    let receiverNewBalance = receiverCurrentBalance + balanceTransfered;
    if (balanceTransfered > senderCurrentBalance) {
        return console.log('Not enough funds')
    }
    else {
        db.User.update(
            { balance: senderNewBalance },
            { where: { userID: senderId } }
        )
            .then(result =>
                console.log('sender result is ' + result)
            )
            .catch(err =>
                console.log(err)
            )

        db.User.update(
            { balance: receiverNewBalance },
            { where: { userID: receiverId } }
        )
            .then(result =>
                console.log('receiver result is ' + result)
            )
            .catch(err =>
                console.log(err)
            )

        db.Participates.update(
            { isPaid: true },
            {
                where: {
                    transactionID: transactionId,
                    participantID: senderId
                }
            }
        )
            .then(result =>
                console.log('participate result is ' + result)
            )
            .catch(err =>
                console.log(err))
    }
}

const findUserByUsername = async (username) => {
    const User = await db.User.findOne({ where: { username: username } })
    console.log(User + 'has been found by username in service');
    return User;

}

const createUser = async (data) => {
    try {
        const newUser = await db.User.create({
            username: data.username,
            email: data.email,
            password: data.password
        });
        console.log("service has created a User " + newUser.username);
        return newUser;
    } catch {
        console.log("Error: user not saved");
    }

}

// function to generate a hash of the password asynchronously with 8 rounds
const generateHash = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

module.exports = {
    findUserByEmail,
    findUserBalance,
    addBalance,
    transferBalancetoUsers,
    findUser,
    createUser,
    generateHash,
    getJwtToken,
    verifyJwtToken,
    findUserByUsername,
    updateUserEmail,
    updateUserName
}
