const express = require('express');
const db = require('../db/connection');
const bcrypt = require('bcrypt');
const { addUser } = require('../db/queries/addUser.js');
const { userExists } = require('../db/queries/userExists.js');

const router = express.Router();

router.get('/', async (req, res) => {
  res.render('register');
});

//Post route for register
router.post('/', async (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 12);
  try {
    const newUser = await addUser(user);
    const exists = await userExists(newUser.email);
  if(exists) {
    res.status(400).send('This user email already exists in our system');
  } else {
    req.session.user_id = newUser.id;
    console.log('successfully registered');
    res.status(200).send("You have successfully registered!");
    res.redirect('/browse');
  }
  } catch (err) {
    res.status(500).send(`${err.message}, "An error has occured during the registration process please try again."`);
  }
});

module.exports = router;

