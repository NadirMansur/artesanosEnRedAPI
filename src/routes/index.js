const express = require("express");

const books = require("./prod");
// const users = require("./users");
// const favorite = require("./favorite");
// const review = require("./review");
// const shoppingcart = require("./r.shoppingcart");
// const mail = require("./mail");

const router = express.Router();

router.use("/productos", prod);

module.exports = router;
