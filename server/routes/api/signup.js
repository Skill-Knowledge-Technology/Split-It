// // Route to create an account for a new user. DOES NOT log in to an existing account

// const express = require('express');
// const router = new express.Router();
// const userController = require('../../controllers/users');
// const {check, param, header} = require('express-validator');
// const validatorErrors = require('../../middleware/validatorErrors');
// const User = require("../../models/User");

// router.post('/signup', (req, res, next) => {
//     const {body} = req;
//     const {password} = body.password;
//     let {email} = body.email;

//     // check that email is non-empty
//     if (!email) {
//         return res.send({
//             success:false,
//             message: 'Error. Must enter an email'
//         });
//     }

//     // check that password is non-empty
//     if (!password) { 
//         return res.send({
//             success:false,
//             message: 'Error. Must enter a password'
//         });
//     }

//     // eliminating whitespace and caps from email
//     email = email.toLowerCase();
//     email = email.trim();


//     // first check that email entered does not already exist, then save user if it is new
//     User.find({
//         email: email
//       }, (err, existingUser) => {
//         if (err) {
//           return res.send({
//             success: false,
//             message: 'Error: Server error'
//           });
//         } else if (existingUser.length > 0) {
//           return res.send({
//             success: false,
//             message: 'Error: An account with that email already exist.'
//           });
//         }      
//         // Save the new user
//         const newUser = new User();      
//         newUser.email = email;
//         // generate hash of password - defined in User model
//         newUser.password = newUser.generateHash(password);
//         newUser.save((err, user) => {
//           if (err) {
//             return res.send({
//               success: false,
//               message: 'Error: Server error'
//             });
//           }
//           return res.send({
//             success: true,
//             message: 'Account created'
//           });
//         });
//       });
// });

// module.exports = router;