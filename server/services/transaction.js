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
        const partTransactions = await db.Participates.findAll({
            where: {
                participantID: id
            }
        });
        console.log("Participated in found: " + partTransactions);
        return partTransactions;
    }
    catch (err) {
        console.log("service error: " + err)
    }
}

const findAllTransactions = async (id) => {
    // literally performing the two same calls as above - there prob is a more 
    // efficient way of doing this 
    const partTransactions = await db.Participates.findAll({
        where: {
            participantID: id
        }
    });

    const ownedTransactions = await db.Transaction.findAll({
            where: {
                ownerID: id
            }
        });
    
    try {
        console.log("return all transactions");
        return(ownedTransactions.concat(partTransactions));
    }
    catch (err) {
        console.log("service error: " + err)
    }
}


module.exports ={
    findTransaction,
    createTransaction,
    findOwnedTransactions,
    findPartTransactions,
    findAllTransactions
}