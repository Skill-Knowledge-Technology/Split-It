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

const transferBalancetoUsers = async (senderId, receiverId, balanceTransfered) => {
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
                console.log(' result is ' + result)
            )
            .catch(err =>
                console.log(err)
            )

        db.User.update(
            { balance: receiverNewBalance },
            { where: { userID: receiverId } }
        )
            .then(result =>
                console.log(' result is ' + result)
            )
            .catch(err =>
                console.log(err)
            )
    }
}



const addFriends = async (userId, friendsId) => {
    friendsId = parseInt(friendsId);
    console.log('friend to add ' + friendsId);
    if (friendsId == userId) {
        return console.log('can not add yourself')
    }
    let currentFriendList = await findUserFriends(userId);
    console.log('currentFriendList is ' + currentFriendList);
    console.log('datatype of current friend list ' + typeof currentFriendList);
    let newFriendList;
    if (currentFriendList == null) {
        newFriendList = [friendsId];
        console.log('initializing new friend list');
        console.log('new friend list is ' + newFriendList);
        console.log('new friend list is typeof ' + typeof newFriendList)
    }
    else {
        const foundFriend = currentFriendList.includes(friendsId)

        if (foundFriend) {
            return console.log('already friends');
        }
        else {
            newFriendList = currentFriendList.concat(friendsId);
        }
        console.log('new friends list ' + newFriendList);
        console.log('datatype of new friends list ' + typeof newFriendList);

    }
    db.User.update(
        { friends: newFriendList },
        { where: { userID: userId } }
    )
        .then(result =>
            console.log('result is ' + result)
        )
        .catch(err =>
            console.log(err)
        )
    console.log('try add to friend');
}


const findUserByUsername = async (username) => {
    const User = await db.User.findOne({ where: { username: username } })
    console.log(User + 'has been found by username in service');
    return User;

}

const findUserFriends = async (userID) => {
    const User = await db.User.findByPk(userID);
    console.log('user found in services');
    return User.friends;
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
// console.log(data.username + " " + data.email + " " + data.password + " - read from createUser function");
// console.log("createUser function invoked");


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
    findUserFriends,
    addFriends,
    createUser,
    generateHash,
    getJwtToken,
    verifyJwtToken,
    findUserByUsername
}
