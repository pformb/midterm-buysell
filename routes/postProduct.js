const express = require('express');
const router  = express.Router();
const {
  addProduct,
} = require("../db/queries/addProduct.js");
const {
  getCategory,
} = require("../db/queries/getCategory.js");
const db = require('../db/connection');

// router.get('/', (req, res) => {
//   const user = req.session.user;
//   res.render('postproduct', { user });
// });

router.get('/', async (req, res) => {
  try {
    const user = req.session.user;
    const categories = await getCategory(db);
    res.render('postproduct', { categories, user });
  } catch (err) {
    console.error('Error fetching categories:', err.message);
    console.error(err.stack);
    // Send back a detailed error message only in development!
    // In production, you should send back a generic error message.
    res.status(500).send('Server error: ' + err.message);
  }
});
// POST request to handle form submission
router.post('/submit_product', (req, res) => {
  console.log('Submit product hit', req.body);
  const product = {
    title: req.body.title,
    description: req.body.description,
    thumbnail: req.body.thumbnail,
    additional_photo: req.body.additional_photo,
    price: req.body.price,
    quantity: req.body.quantity,
    category_id: req.body.category_id,
    user_id: req.body.user_id,
    status: req.body.status
  };

  // Call the addProduct function and handle the promise it returns
  addProduct(product, db)
    .then(result => {
      // Redirect to a success page or render a success message
      res.redirect('/browse'); // Optionally, redirect the user
      // Or you can return the result as JSON
      // res.json({ message: 'Product added successfully', product: result });
    })
    .catch(err => {
      // Handle errors, possibly showing the form again with an error message
      res.status(500).render('postproduct', { user: req.session.user, error: 'Failed to add product' });
    });
});

module.exports = router;
