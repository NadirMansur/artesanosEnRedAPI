const express = require("express");

const prod = require("./prod");
const rubro = require("./rubro");
const art = require("./art");
const google = require("./google");
const galeria = require("./galeria");
const user = require("./user");

const router = express.Router();

router.use("/productos", prod);
router.use("/rubro", rubro);
router.use("/art", art);
router.use("/auth/google", google);
router.use("/user", user);
router.use("/galeria", galeria);

module.exports = router;
