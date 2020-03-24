const db =require('../models')

const findTransaction = async (id) => {
    const Transaction = await db.Transaction.findByPk(id);
    console.log(Transaction + 'found');
    return Transaction;
}

module.exports ={
    findTransaction
}