const db =require('../models')

const findTransaction = async (id) => {
    const Transaction = await db.Transaction.findByPk(id);
    console.log(Transaction + 'found');
    return Transaction;
}
const createTransaction = async (data)=> {
    const newTransaction = await db.Transaction.create({
        balance: data.balance,
        ownerId: data.ownerId
    });
    console.log("service has creaetd a transaction owned by user " + newTransaction.ownerId);
    return newTransaction;

}


module.exports ={
    findTransaction,
    createTransaction
}