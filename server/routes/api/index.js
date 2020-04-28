const express = require('express');
const router = new express.Router();
const users = require('./users');
const transactions = require('./transactions');
const friendships = require('./friendships')
const participates = require('./participates');

router.use('/users', users);

// ../api/
router.use('/transactions', transactions);

router.use('/friendships', friendships);
router.use('/participates', participates);

router.use('*', (req, res, next) => {
  res.status(404).json({ errors: [{ msg: 'Unknown API route' }] });
});



module.exports = router;