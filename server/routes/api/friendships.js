const express = require('express');
const router = new express.Router;
const friendshipController = require('../../controllers/friendships');
const {check, param, header} = require('express-validator');
const validatorErrors = require('../../middleware/validatorErrors');


// should match with /api/friendships/

router.post('/createFriendship', [validatorErrors],friendshipController.createFriendship);

router.get('/getFriendship/:requesterId/:addresseeId',[validatorErrors],friendshipController.getFriendship);

router.get('/myFriendRequests/:userId',[validatorErrors], friendshipController.getMyFriendRequests);

module.exports = router; 