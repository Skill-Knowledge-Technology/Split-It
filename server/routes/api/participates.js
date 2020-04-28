const express = require('express');
const router = new express.Router();
const participatesController = require('../../controllers/participates');
const { check, param, header } = require('express-validator');
const validatorErrors = require('../../middleware/validatorErrors');

// should match with "/api/participates"
router.get('/:transactionId/:participantId', [validatorErrors], participatesController.getParticipate);

router.post('/addParticipant', [validatorErrors], participatesController.createParticipant);

module.exports = router;