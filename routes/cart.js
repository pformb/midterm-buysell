const express = require("express");
const router = express.Router();
const db = require("../db/connection.js");

router.get("/", (req, res) => {
  const user = req.session.user;
  res.render("cart", { user });
});

//route to add items to cart from product page
//note to self table is named carts not cart

router.post("/", (req, res) => {

  const {product_id, quanitity} = req.body;
  const user = req.session.user;

  // console.log("product_id", product_id);
  // console.log("quantity", quanitity);
  // console.log("user", user);
  // console.log("cart_id", cart_id);

//insert the product_id and quanitity into the carts table
//needs to also join on the users table to get the user_id
//needs to also join on the products table to get the price
//needs to also join on the cart table to get the cart_id
//ensure the cart is keyed to the user_id, option to save user cart if they log out and log back in ?
//if the product is already in the cart, update the quantity
});

//route to remove items from cart
router.delete("/", (req, res) => {
  const {product_id, quanitity} = req.body;
  const user = req.session.user;

  // console.log("product_id", product_id);
  // console.log("quantity", quanitity);
  // console.log("user", user);
  // console.log("cart_id", cart_id);

//delete the product_id and quanitity from the carts table and all associated data
});
module.exports = router;
