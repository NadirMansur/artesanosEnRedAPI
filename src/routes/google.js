////////////////////////////////////////////////////////////
const express = require("express");
const router = express.Router();
const passport = require("passport");
const googleLogin = require("../controllers/login/googleLogin");
////////////////////////////////////////////////////////////
//const getAllArt = require("../controllers/artesano/getAllArt");
////////////////////////////////////////////////////////////

// Middleware para la autenticación de Google
const authenticateGoogle = passport.authenticate("google", {
  scope: "profile",
});
/* GET books listing. l*/
// Ruta para iniciar el proceso de autenticación de Google
router.get("/", authenticateGoogle);

router.get(
  "/callback",
  authenticateGoogle,
  //passport.authenticate("google", { failureRedirect: "/" }),
  googleLogin
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
