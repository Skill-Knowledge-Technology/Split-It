const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    title: 'Split It',
    description: 'A web based server that could also be accessed on mobile to help split bills or payments.',
  });
});


module.exports = router;