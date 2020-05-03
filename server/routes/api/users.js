
const express = require('express');
const router = new express.Router();
const userController = require('../../controllers/users');
const { check, param, header } = require('express-validator');
const validatorErrors = require('../../middleware/validatorErrors');
const userMiddleware = require('../../middleware/users')


// should match with "/api/users"
router.get('/:userId', [validatorErrors], userController.getUserById);

router.get('/findByUsername/:username',[validatorErrors], userController.getUserByUsername);

router.get('/findByEmail/:email',[validatorErrors], userController.getUserByEmail);

router.get('/getBalance/:userId', [validatorErrors], userController.getUserBalance);

router.post('/addToBalance', [validatorErrors], userController.addToUserBalance);

router.post('/transferBalance/:senderId', [validatorErrors], userController.transferUserBalance);


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
    check('username').isLength({min:1}).withMessage('Username must be at least 1 or more character long')
    .bail()
    .custom(userMiddleware.expressValidator.usernameIsUnique),
    check('email').isEmail().withMessage('Email must be valid')
    .bail()
    .custom(userMiddleware.expressValidator.emailShouldExist(false)),
    check('password').isLength({min:6}).withMessage('Password must be at least 6 or more characters long'),
    validatorErrors
], userController.register);

module.exports = router;


// .custom(userMiddleware.expressValidator.matches),