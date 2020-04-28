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


module.exports ={
    findTransaction,
    createTransaction
}