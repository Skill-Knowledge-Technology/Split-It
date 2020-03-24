const express = require('express');
const router = new express.Router;
const transactionController = require('../../controllers/transactions');
const {check, param, header} = require('express-validator');
const validatorErrors = require('../../middleware/validatorErrors');
//const transactionMiddleware = require('../../middleware/transactions')


//should match with '/api/transactions'
router.get('/:transactionId', [validatorErrors],transactionController.getTransId);

// './api/createTransaction'
router.post('./createTransaction',[validatorErrors],transactionController.createTransaction);
module.exports = router;
