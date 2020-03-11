
const express = require('express');
const router = new express.Router();
const userController = require('../../controllers/users');
const { check, param, header } = require('express-validator');
const validatorErrors = require('../../middleware/validatorErrors');

/* get a User */
// router.get(':/userId', [validatorErrors], userController.getUserById);
// router.post(':/register', [validatorErrors], userController.register);

// should match with "/api/users"
router.route("/")
    .get(function (req, res) {
        res.send("hit api/users route");
    });

router.route("/:id")
    // .get(userController.getUserById);
    .get(function (req,res) {
        res.send("hit api/users/id route");
    });

router.route("/register")
    .post(function (req, res) {
        res.send("hit api/users/register route");
    });


module.exports = router;