const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('register');
});

//Post route for register
router.post('/', (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 12);

  db.query(`
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `, [user.name, user.email, user.password])
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

