const express = require('express');
const router = new express.Router();
const users = require('./users');
const transactions = require('./tranactions');

  router.use('/users', users);

  // ../api/
 router.use('/transactions',transactions);
    
  router.use('*', (req, res, next) => {
      res.status(404).json({errors: [{msg: 'Unknown API route'}]});
    });
    


  module.exports = router;