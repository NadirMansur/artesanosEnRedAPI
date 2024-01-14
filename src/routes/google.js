////////////////////////////////////////////////////////////
const express = require("express");
const router = express.Router();
const passport = require("passport");
const googleLogin = require("../controllers/login/googleLogin");
////////////////////////////////////////////////////////////
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
  googleLogin,
  passport.authenticate("google", {
    successReturnToOrRedirect: "/",
    failureRedirect: "/",
  })
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
