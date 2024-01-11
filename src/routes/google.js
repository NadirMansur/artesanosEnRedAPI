////////////////////////////////////////////////////////////
const express = require("express");
const router = express.Router();
const passport = require("passport");
const { User } = require("../db");

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
  passport.authenticate("google", { failureRedirect: "/" }),
  async (req, res) => {
    // Manejar redirección exitosa, si es necesario
    try {
      // Obtén la información del usuario autenticado desde la base de datos
      const user = await User.findOne({
        where: { googleId: req.user.googleId },
      });
      console.log("passport.authenticate, user: ", user);
      // Maneja la redirección exitosa y envía la información del usuario al frontend
      res.json({ user });
      //res.redirect("/ruta_despues_de_autenticar");//modificar la ruta luego de autentificar
      console.log("Antes de enviar la respuesta");
      res.send(
        `<script>window.opener.postMessage(${JSON.stringify({
          user,
        })}, "*"); window.close();</script>`
      );
      console.log("Después de enviar la respuesta");
    } catch (error) {
      // Maneja cualquier error que pueda ocurrir al buscar el usuario
      console.error("Error al buscar el usuario:", error);
      res.status(500).json({ error: "Error al buscar el usuario" });
    }
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
