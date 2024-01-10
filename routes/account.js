const express = require('express');
const router = express.Router();
const { getUserByEmail } = require('../db/queries/getUserByEmail.js');
const db = require("../db/connection.js");


router.get('/', (req, res) => {
  const email = 'user7@email.com';
  getUserByEmail(email)
    .then((user) => {
      // const user = req.session.user;
      return res.render('account', {user});
    });
});

module.exports = router;
