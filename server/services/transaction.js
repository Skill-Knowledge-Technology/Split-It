const db =require('../models')

const findTransaction = async (id) => {
    const Transaction = await db.Transaction.findByPk(id);
    console.log(Transaction + 'found');
    return Transaction;
}

const createTransaction = async (data)=> {
    try {
    const newTransaction = await db.Transaction.create({
        ownerID: data.ownerID,
        total: data.total,
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude
    });
    console.log("service has created a transaction owned by user " + newTransaction.ownerID);
    return newTransaction;
    }
    catch (error) {
        return console.log(error);
    }
}


const findOwnedTransactions = async (id) => {
    try {
        const ownedTransactions = await db.Transaction.findAll({
            where: {
                ownerID: id
            }
        });
        console.log("Owned Transactions found: " + ownedTransactions);
        return ownedTransactions;
    }
    catch (err) {
        console.log("service error: " + err)
    }
}

const findPartTransactions = async (id) => {
    try {
        const partTransactions = await db.Transaction.findAll({
            where: {
                
            }
        })
    }
}


module.exports ={
    findTransaction,
    createTransaction,
    findOwnedTransactions
}