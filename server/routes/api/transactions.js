const express = require('express');
const router = new express.Router;
const transactionController = require('../../controllers/transactions');
const {check, param, header} = require('express-validator');
const validatorErrors = require('../../middleware/validatorErrors');
//const transactionMiddleware = require('../../middleware/transactions')


//should match with '/api/transactions'
router.get('/:transactionId', [validatorErrors],transactionController.getTransId);

router.post('/createTransaction',[validatorErrors],transactionController.createTransaction);

router.get('/ownedTransactions/:userID',[validatorErrors], transactionController.getOwnedTransactions);

router.get('partTransactions/:userID',[validatorErrors], transactionController.getPartTransactions);

module.exports = router;
