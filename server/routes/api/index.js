const express = require('express');
const router = express.Router();
const users = require('./users');

// this is where all the routes will be in 

router.use('/users', users);


router.use('*', (req, res, next) => {
  res.status(404).json({errors: [{msg: 'Unknown API route'}]});
});

  module.exports = router;