const { User } = require("../../db");
const renderUserInfoPage = require("../../utils/renderUserInfo")


const googleLogin = async (req, res) => {
  // Manejar redirección exitosa, si es necesario
  console.log("estoy en controlador googleLogin")
  try {
    // Obtén la información del usuario autenticado desde la base de datos
    const user = await User.findOne({
        where: { googleId: req.user.googleId },
      });
      console.log("Antes de enviar la respuesta");
      if (user) {
        const renderedPage = renderUserInfoPage(user);
  
        // Envia la página HTML como respuesta
        res.send(renderedPage);
        //res.redirect(`http://localhost:5173/auth/google/callback?googleId=${req.user.googleId}`);
      }else {
        res.status(404).json({ error: "Usuario no encontrado" });
      }
      
      //res.redirect("/ruta_despues_de_autenticar");//modificar la ruta luego de autentificar

      console.log("Después de enviar la respuesta");
  } catch (err) {
     // Maneja cualquier error que pueda ocurrir al buscar el usuario
     console.error("Error al buscar el usuario:", err);
     res.status(500).json({ error: "Error al buscar el usuario" });
  }
};

module.exports = googleLogin;
