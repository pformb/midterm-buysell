const express = require("express");
const router = express.Router();
const {
  getAllProductsFilter,
} = require("../db/queries/getAllProductsFilter.js");
const db = require("../db/connection.js");

router.get("/", (req, res) => {
  getAllProductsFilter(db).then((data) => {
    const user = req.session.user;
    console.log(data);
    res.render("browse", { data, user });
  });
});
// Filter by category
router.get("/:filter", (req, res) => {
  console.log(`req.params:`, req.params);
  const options = {
    category: req.params.filter,
  };
  getAllProductsFilter(db, options).then((data) => {
    const user = req.session.user;
    console.log(data);
    res.render("browse", { data, user });
  });
});

// Filter by price
router.get("/:minimum/:maximum", (req, res) => {
  console.log(`req.params:`, req.params);
  const options = {
    minimum_price: req.params.minimum,
    maximum_price: req.params.maximum,
  };
  getAllProductsFilter(db, options).then((data) => {
    const user = req.session.user;
    console.log(data);
    res.render("browse", { data, user });
  });
});

// Filter by category and price
router.get("/:filter/:minimum/:maximum", (req, res) => {
  console.log(`req.params:`, req.params);
  const options = {
    category: req.params.filter,
    minimum_price: req.params.minimum,
    maximum_price: req.params.maximum,
  };
  getAllProductsFilter(db, options).then((data) => {
    const user = req.session.user;
    console.log(data);
    res.render("browse", { data, user });
  });
});

module.exports = router;
