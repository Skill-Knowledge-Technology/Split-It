const express = require('express');
const router = new express.Router;
const friendshipController = require('../../controllers/friendships');
const {check, param, header} = require('express-validator');
const validatorErrors = require('../../middleware/validatorErrors');


// should match with /api/friendships/

router.post('/createFriendship', [validatorErrors],friendshipController.createFriendship);

router.get('/getFriendship/:requesterId/:addresseeId',[validatorErrors],friendshipController.getFriendship);

router.get('/getMyFriends/:userId',[validatorErrors],friendshipController.getMyFriends);

router.get('/myFriendRequests/:userId',[validatorErrors], friendshipController.getMyFriendRequests);

router.get('/mySentRequests/:userId', [validatorErrors], friendshipController.getSentRequests);

router.put('/acceptRequest/:requesterId/:addresseeId',[validatorErrors],friendshipController.acceptRequest);

router.delete('/removeFriendship/:requesterId/:addresseeId',[validatorErrors], friendshipController.removeFriendship);

module.exports = router; 