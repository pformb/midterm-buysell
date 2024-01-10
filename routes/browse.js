const express = require("express");
const router = express.Router();
const { getAllProducts } = require("../db/queries/getAllProducts.js");
const db = require("../db/connection.js");

router.get("/", (req, res) => {
  getAllProducts(db).then((data) => {
    const user = req.session.user;
    console.log(data);
    res.render("browse", {data, user});
  });


});

module.exports = router;
