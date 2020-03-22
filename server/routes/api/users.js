
const express = require('express');
const router = new express.Router();
const userController = require('../../controllers/users');
const { check, param, header } = require('express-validator');
const validatorErrors = require('../../middleware/validatorErrors');
const userMiddleware = require('../../middleware/users')


// should match with "/api/users"
router.get('/:userId', [validatorErrors], userController.getUserById);

// should match with "/api/users/login"
router.post('/login', [
    check('email')
    .isLength({min : 1}).withMessage('Email field required')
    .bail()
    .isEmail().withMessage("Email must be valid")
    .bail()
    .custom(userMiddleware.expressValidator.emailShouldExist(true)),
    check('password').custom(userMiddleware.expressValidator.passwordMatchesHash),
    validatorErrors
    ], userController.login)

router.post('/register', [
    check('name').isLength({min:1}).withMessage('Name must be at least 1 or more character long'),
    check('email').isEmail().withMessage('Email must be valid')
    .bail()
    .custom(userMiddleware.expressValidator.emailShouldExist(false)),
    check('password').isLength({min:6}).withMessage('Password must be > 6 characters long'),
    validatorErrors
], userController.register);

module.exports = router;