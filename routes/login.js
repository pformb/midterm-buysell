const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { getUserById } = require('../db/queries/getUserByEmail.js');


router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  try {
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user_id = user.id;
      res.redirect('/browse').status(200).send('Login Successful');
    } else {
      res.redirect('/login').status(401).send('Login Failed: invalid email or password');
    }
  } catch (err) {
    res.status(500).send("An error occurred during the login process");
  }
});

module.exports = router;
