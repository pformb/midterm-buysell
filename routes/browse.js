const express = require("express");
const router = express.Router();
const { getAllProductsFilter } = require("../db/queries/getAllProductsFilter.js");
const db = require("../db/connection.js");

router.get("/", (req, res) => {
  getAllProductsFilter(db).then((data) => {
    const user = req.session.user;
    console.log(data);
    res.render("browse", {data, user});
  });


});

// use below when add in min/max price and qty.
// /:minimum/:maximum
router.get("/:filter", (req, res) => {
  console.log(`req.params:`, req.params);
  const options = {category: req.params.filter};
  getAllProductsFilter(db, options).then((data) => {
    const user = req.session.user;
    console.log(data);
    res.render("browse", {data, user});
  });


});


module.exports = router;
