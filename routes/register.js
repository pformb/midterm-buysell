const express = require('express');
const db = require('../db/connection');
const bcrypt = require('bcrypt');
const { addUser } = require('../db/queries/addUser');
const { userExists } = require('../db/queries/userExists');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('register');
});

//Post route for register
router.post('/', (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 12);

  db.query(`
    INSERT INTO users (first_name, last_name, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `, [user.firstName, user.lastName, user.email, user.password])
    .then((data) => {
      const user = data.rows[0];
      req.session.user_id = user.id;
      res.redirect('/');
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;

