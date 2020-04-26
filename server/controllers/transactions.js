const TransactionServices = require("../services/transaction")

const getTransId = (req, res, next) => {
    return TransactionServices.findTransaction(req.params.transactionId)
        .then((transaction) => {
            res.json(transaction)
        })
        .catch(error => next(error))


}
const createTransaction = async (req, res, next) => {
    let total = req.body.total;
    let ownerId = req.body.ownerID;
    const transaction = {total,ownerId};
    try {
        const createTransaction = TransactionServices.createTransaction(transaction)
        res.json(createTransaction)
        console.log('transaction created')
    }
    catch (err) {
        //      next(error)
        console.log('controller error')
    }
}

module.exports = {
    getTransId,
    createTransaction
}