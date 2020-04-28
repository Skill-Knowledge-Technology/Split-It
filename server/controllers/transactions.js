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
    let ownerID = req.body.ownerID;
    let address = req.body.address;
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;
    const transaction = {total, ownerID, address, latitude, longitude};
    TransactionServices.createTransaction(transaction)
    .then((transaction) => {
        res.json(transaction);
        console.log('transaction created')
    })
    .catch(error => next(error))
}

module.exports = {
    getTransId,
    createTransaction
}