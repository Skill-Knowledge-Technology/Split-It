// Route to create an account for a new user. DOES NOT log in to an existing account

const express = require('express');
const router = new express.Router();
const userController = require('../../controllers/users');
const {check, param, header} = require('express-validator');
const validatorErrors = require('../../middleware/validatorErrors');

router.post('/signup', (req, res, next) => {
    const {body} = req;
    const {password} = body;
    let {email} = body;

    // check that email is non-empty
    if (!email) {
        return res.send({
            success:false,
            message: 'Error. Must enter an email'
        });
    }

    // check that password is non-empty
    if (!password) { 
        return res.send({
            success:false,
            message: 'Error. Must enter a password'
        });
    }

    // eliminating whitespace and caps from email
    email = email.toLowerCase();
    email = email.trim();


    // first check that email entered does not already exist, then save user if it is new
    
})