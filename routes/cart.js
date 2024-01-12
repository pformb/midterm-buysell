const express = require("express");
const router = express.Router();
const db = require("../db/connection.js");

router.get("/", (req, res) => {
  const userId = req.session.user.id;
  const query = `
  SELECT products.*, carts.quantity
  FROM carts
  JOIN products ON carts.product_id = products.id
  WHERE carts.user_id = $1
  `;
  db.query((query, [userId]))
    .then(result => {
      const cartItems = result.rows;
      res.render("cart", { user });
    })
    .catch(err => res.status(500).send(err));
});

//route to add items to cart from product page
//note to self table is named carts not cart

router.post("/", (req, res) => {

  const { product_id, quanitity } = req.body;
  const userId = req.session.user.id;

  //if the product is not in the cart, insert the product and quantity
  const query = `
INSERT INTO CARTS (user_id, product_id, quanitiy)
SELECT $1, $2, $3
WHERE NOT EXISTS (
  SELECT * FROM carts WHERE user_id = $1 AND product_id = $2
)
`;
  const values = [userId, product_id, quanitity];

  db.query(query, values)
    .then(() => res.redirect("/cart"))
    .catch(err => res.status(500).send(err));
});

//route to remove items from cart needs to be a post with a delete method
router.post("/", (req, res) => {
  const { product_id, quanitity } = req.body;
  const userId = req.session.user.id;

  if (action === "remove") {
  const query = `
  DELETE FROM carts
  WHERE user_id = $1 AND product_id = $2`;
  const values = [userId, product_id];

  db.query(query, values)
    .then(() => res.redirect("/cart"))
    .catch(err => res.status(500).send(err));
  }
});

module.exports = router;


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


// console.log("product_id", product_id);
// console.log("quantity", quanitity);
// console.log("user", user);
// console.log("cart_id", cart_id);

//delete the product_id and quanitity from the carts table and all associated data
