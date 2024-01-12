const express = require('express');
const router = express.Router();
const { getUserByEmail } = require('../db/queries/getUserByEmail.js');
// const db = require("../db/connection.js");
const editUserInfo = require('../db/queries/editUserInfo.js');

router.use(express.urlencoded({ extended: true }));


router.get('/', (req, res) => {
  const email = 'user8@email.com';
  getUserByEmail(email)
    .then((user) => {
      // const user = req.session.user;
      return res.render('account', {user});
    });
});

router.post('/', (req, res) => {
const city = req.body.city;
const street = req.body.street;
const province = req.body.province;
const postal_code = req.body.postal_code;

editUserInfo(city, street, province, postal_code)
  .then(() => {
    res.redirect('/account');
  })
  .catch((error) => {
    console.error('Error updating user information:', error);
    res.status(500).send('Internal Server Error');
  });
});

module.exports = router;
