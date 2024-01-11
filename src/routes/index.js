const express = require("express");

const prod = require("./prod");
const rubro = require("./rubro");
const art = require("./art");
const google = require("./google");
// const review = require("./review");
// const mail = require("./mail");

const router = express.Router();

router.use("/productos", prod);
router.use("/rubro", rubro);
router.use("/art", art);
router.use("/auth/google", google);

module.exports = router;
