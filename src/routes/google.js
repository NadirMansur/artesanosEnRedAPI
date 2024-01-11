////////////////////////////////////////////////////////////
const express = require("express");
const router = express.Router();
const passport = require("passport");
////////////////////////////////////////////////////////////
const getAllArt = require("../controllers/artesano/getAllArt");
////////////////////////////////////////////////////////////

/* GET books listing. l*/
router.get(
  "/",
  passport.authenticate("google", {
    scope: "profile",
  })
);

router.get("/crear", passport.authenticate("google", { session: true }));

router.get(
  "/crear/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Manejar redirección exitosa, si es necesario
    res.redirect("/ruta_despues_de_autenticar");
  }
);
////////////////////////////

/* POST books listing. */
//router.post("/", createArtesano);
////////////////////////////

/* DELETE books listing. */
//router.delete("/delete/:id", deleteArt);
////////////////////////////

/* PUT books listing. */
//router.put("/update", modifyArt); //"/update/:id"
//router.put("/restore/:id", restoreArt);
////////////////////////////

module.exports = router;
