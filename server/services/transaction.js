const db =require('../models')

const findTransaction = async (id) => {
    const Transaction = await db.Transaction.findByPk(id);
    console.log(Transaction + 'found');
    return Transaction;
}
const createTransaction = async (data)=> {
    try {
    const newTransaction = await db.Transaction.create({
        total: data.total,
        ownerID: data.ownerId
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