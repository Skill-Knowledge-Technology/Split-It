const db =require('../models')

const findTransaction = async (id) => {
    const Transaction = await db.Transaction.findByPk(id);
    console.log(Transaction + 'found');
    return Transaction;
}
const createTransaction = async (data)=> {
    const newTransaction = await db.Transaction.create({
        total: data.total,
        userID: data.ownerId,
        date: Date.now()
    });
    console.log("service has creaetd a transaction owned by user " + newTransaction.userID);
    return newTransaction;

}


module.exports ={
    findTransaction,
    createTransaction
}