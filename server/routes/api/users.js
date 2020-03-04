
const express = require('express');
const router = new express.Router();
const userController = require('../../controllers/users');
const {check, param, header} = require('express-validator');
const validatorErrors = require('../../middleware/validatorErrors');

/* get a User */
router.get(':/userId', [validatorErrors], userController.getUserById)


module.exports = router;