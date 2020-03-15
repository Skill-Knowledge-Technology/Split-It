
const express = require('express');
const router = new express.Router();
const userController = require('../../controllers/users');
const { check, param, header } = require('express-validator');
const validatorErrors = require('../../middleware/validatorErrors');



// should match with "/api/users"
router.get('/:userId', [validatorErrors], userController.getUserById);
router.post('/register', [validatorErrors], userController.register);

module.exports = router;