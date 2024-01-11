const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { getUserByEmail } = require('../db/queries/getUserByEmail.js');


router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);

    if (!user && bcrypt.compareSync(password, user.password)) {
      console.log('login failure');
      res.status(401).send('Login Failed: invalid email or password');

    } else {
      req.session.user = user;
      console.log('login success');
      return res.redirect('/browse');
    }
});

module.exports = router;
