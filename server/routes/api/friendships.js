const express = require('express');
const router = new express.Router;
const friendshipController = require('../../controllers/friendships');
const {check, param, header} = require('express-validator');
const validatorErrors = require('../../middleware/validatorErrors');

//router.get('/:friendshipId
// /api/friendships/

router.post('/createFriendship', [validatorErrors],friendshipController.createFriendship);

router.get('/:requesterId/:addresseeId',[validatorErrors],friendshipController.getFriendship);
module.exports = router; 