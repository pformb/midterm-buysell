const express = require('express');
const bcrypt = require('bcrypt');
const { addUser } = require('../db/queries/addUser.js');
const { userExists } = require('../db/queries/userExists.js');

const router = express.Router();

router.get('/', async (req, res) => {
  res.render('register');
});

router.post('/', async (req, res) => {
  const user = req.body;
  //may break out into seperate validations time permitting
  if (!user.firstName || !user.lastName || !user.email || !user.password || !user.username) {
    return res.status(400).send('All fields must be filled out');
  }

  user.password = bcrypt.hashSync(user.password, 12);
  try {
    const exists = await userExists(user.email);
    if (!exists) {
      const newUser = await addUser(user);
      req.session.user_id = newUser.id;
      console.log('successfully registered');
      res.redirect('/browse');
    } else {
      res.status(400).send('This user email already exists in our system');
    }
  } catch (err) {
    res.status(500).send(`${err.message}, "An error has occured during the registration process please try again."`);
  }
});

//Post route for register
// router.post('/', async (req, res) => {
//   const user = req.body;
//   //may break out into seperate validations time permitting
//   if (!user.firstName || !user.lastName || !user.email || !user.password || !user.username) {
//     return res.status(400).send('All fields must be filled out');
//   }

//   user.password = bcrypt.hashSync(user.password, 12);
//   try {
//     const newUser = await addUser(user);
//     const exists = await userExists(newUser.email);
//     if (!exists) {
//       req.session.user_id = newUser.id;
//       console.log('successfully registered');
//       res.redirect('/browse');

//     } else {
//       res.status(400).send('This user email already exists in our system');
//     }

//   } catch (err) {
//     res.status(500).send(`${err.message}, "An error has occured during the registration process please try again."`);
//   }
// });

module.exports = router;

