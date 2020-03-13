const path = require("path");
const express = require('express');
const router = new express.Router();
const users = require('./users');

// this is where all the routes will be in 

// router.use('/', (req, res) => {
//     res.json({
//       title: 'Split It',
//       description: 'A web based server that could also be accessed on mobile to help split bills or payments.',
//     });
//     console.log("hit main route");
//   });

  router.use('/users', users);

  // ../api/
  router.route("/")
    .get(function (req, res) {
        res.send("hit main api route");
    });



  module.exports = router;