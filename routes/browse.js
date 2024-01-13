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
  console.log(`Filter Category:`, req.params);
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
router.get("/minPrice/:minimum/maxPrice/:maximum", (req, res) => {
  console.log(`Filer Price:`, req.params);
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

// Filter by quantity
router.get("/minQty/:minQty/maxQty/:maxQty", (req, res) => {
  console.log(`Filter Qty:`, req.params);
  const options = {
    minimum_quantity: req.params.minQty,
    maximum_quantity: req.params.maxQty,
  };
  getAllProductsFilter(db, options).then((data) => {
    const user = req.session.user;
    console.log(data);
    res.render("browse", { data, user });
  });
});

// Filter by category and price
router.get("/:filter/minPrice/:minimum/maxPrice/:maximum", (req, res) => {
  console.log(`Filter Category and min/max Price:`, req.params);
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

// Filter by category and quantity
router.get("/:filter/minQty/:minQty/maxQty/:maxQty", (req, res) => {
  console.log(`Filter Category min/mx Qty:`, req.params);
  const options = {
    category: req.params.filter,
    minimum_quantity: req.params.minQty,
    maximum_quantity: req.params.maxQty,
  };
  getAllProductsFilter(db, options).then((data) => {
    const user = req.session.user;
    console.log(data);
    res.render("browse", { data, user });
  });
});

// Filter by price and quantity
router.get("/minPrice/:minimum/maxPrice/:maximum/minQty/:minQty/maxQty/:maxQty", (req, res) => {
  console.log(`Filter price and qty:`, req.params);
  const options = {
    category: req.params.filter,
    minimum_price: req.params.minimum,
    maximum_price: req.params.maximum,
    minimum_quantity: req.params.minQty,
    maximum_quantity: req.params.maxQty,
  };
  getAllProductsFilter(db, options).then((data) => {
    const user = req.session.user;
    console.log(data);
    res.render("browse", { data, user });
  });
});

// Filter by category and price and quantity
router.get("/:filter/minPrice/:minimum/maxPrice/:maximum/minQty/:minQty/maxQty/:maxQty", (req, res) => {
  console.log(`Filter Category, price and qty:`, req.params);
  const options = {
    category: req.params.filter,
    minimum_price: req.params.minimum,
    maximum_price: req.params.maximum,
    minimum_quantity: req.params.minQty,
    maximum_quantity: req.params.maxQty,
  };
  getAllProductsFilter(db, options).then((data) => {
    const user = req.session.user;
    console.log(data);
    res.render("browse", { data, user });
  });
});

module.exports = router;
