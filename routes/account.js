const express = require('express');
const router = express.Router();
const db = require("../db/connection.js");


router.get('/', (req, res) => {
  const user = req.session.user;
  res.render('account', { user });
});

module.exports = router;
