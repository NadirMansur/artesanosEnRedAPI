const { User } = require("../../db");

const googleLogin = async (req, res) => {
  // Manejar redirección exitosa, si es necesario
  console.log("estoy en controlador googleLogin")
  try {
    // Obtén la información del usuario autenticado desde la base de datos
    const user = await User.findOne({
        where: { googleId: req.user.googleId },
      });
      console.log("passport.authenticate, user: ", user);
      // Maneja la redirección exitosa y envía la información del usuario al frontend
      res.json({ user: user });
      //res.redirect("/ruta_despues_de_autenticar");//modificar la ruta luego de autentificar
      console.log("Antes de enviar la respuesta");
      // res.send(
      //   `<script>window.opener.postMessage(${JSON.stringify({
      //     user, message: "ingrese al script de respuepueta del servidor"
      //   })}, "*"); window.close();</script>`
      // );
      console.log("Después de enviar la respuesta");
  } catch (err) {
     // Maneja cualquier error que pueda ocurrir al buscar el usuario
     console.error("Error al buscar el usuario:", err);
     res.status(500).json({ error: "Error al buscar el usuario" });
  }
};

module.exports = googleLogin;
