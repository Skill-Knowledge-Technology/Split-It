const TransactionServices = require("../services/transaction")

const getTransId = (req, res, next) => {
    return TransactionServices.findTransaction(req.params.transactionId)
        .then((transaction) => {
            res.json(transaction)
        })
        .catch(error => next(error))


}
const createTransaction = async (req, res, next) => {
    let balance = req.body.balance;
    let ownerId = req.body.userID;
    try {
        const createTransaction = TransactionServices.createTransaction(transaction)
        res.json(createTransaction)
        console.log('transaction created')
    }
    catch (err) {
        next(error)
    }
}

module.exports = {
    getTransId
}