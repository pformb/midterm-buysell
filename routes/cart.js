const express = require("express");
const router = express.Router();
const db = require("../db/connection.js");

router.get("/", (req, res) => {
  console.log("req.session.user", req.session.user);
  const user = req.session.user;
  const query = `
  SELECT products.*, carts.quantity
  FROM carts
  JOIN products ON carts.product_id = products.id
  WHERE carts.user_id = $1
  `;
const values = [user.id];

  db.query(query, [user.id])
    .then(result => {
      console.log(result);
      const cartItems = result.rows;
      console.log(cartItems);
      res.render("cart", { user, cartItems });
    })
    .catch(err => res.status(500).send(err));
});

//route to add items to cart from product page
//note to self table is named carts not cart

router.post("/", (req, res) => {
  const { itemId: product_id, quantity, action } = req.body;
  const user = req.session.user;

  //if the product is not in the cart, insert the product and quantity
  if (action === "add-cart") {
  const query = `
INSERT INTO CARTS (user_id, product_id, quantity)
SELECT $1, $2, $3
WHERE NOT EXISTS (
  SELECT * FROM carts WHERE user_id = $1 AND product_id = $2
)
`;

const values = [user.id, product_id, quantity];
  db.query(query, values)
    .then(() => res.redirect("/cart"))
    .catch(err => res.status(500).send(err));
  } else if (action === "remove") {
    const query = `
    DELETE FROM carts
    WHERE user_id = $1 AND product_id = $2`;

    const values = [user.id, product_id];

    db.query(query, values)
      .then(() => res.redirect("/cart"))
      .catch(err => res.status(500).send(err));
  }
});

module.exports = router;
