const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  const user = req.session.user;
  res.render('postproduct', { user });
});

module.exports = router;
