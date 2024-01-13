const express = require('express');
const router = express.Router();
const { getUserByEmail } = require('../db/queries/getUserByEmail.js');
// const db = require("../db/connection.js");
const editUserInfo = require('../db/queries/editUserInfo.js');
const getOrders = require('../db/queries/getOrders.js');

router.use(express.urlencoded({ extended: true }));


router.get('/', (req, res) => {
  const email = 'user8@email.com';
  getUserByEmail(email)
    .then((user) => {
      // const user = req.session.user;
      return res.render('account', {user});
    });
});

// router.get('/', (req, res) => {
//   const email = 'user8@email.com';
//   getUserByEmail(email)
//     .then((user) => {
//       getOrders(email)
//         .then((orders) => {
//           return res.render('account', { user, orders });
//         })
//         .catch((error) => {
//           console.error('Error getting orders:', error);
//           res.status(500).send('Internal Server Error');
//         });
//     })
//     .catch((error) => {
//       console.error('Error getting user by email:', error);
//       res.status(500).send('Internal Server Error');
//     });
// });


router.post('/', (req, res) => {
const city = req.body.city;
const street = req.body.street;
const province = req.body.province;
const postal_code = req.body.postal_code;

editUserInfo(street, city, postal_code, province)
  .then(() => {
    res.redirect('/account');
  })
  .catch((error) => {
    console.error('Error updating user information:', error);
    res.status(500).send('Internal Server Error');
  });
});

module.exports = router;
