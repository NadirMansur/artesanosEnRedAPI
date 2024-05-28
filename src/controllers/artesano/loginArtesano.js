const bcrypt = require("bcrypt");
const { Artesano } = require("../../db");

const loginArtesano = async (req, res, next) => {
  try {
    const { singInUsername, signInPassword } = req.body;

    const art = await Artesano.findOne({
      where: {
        username: singInUsername,
      },
    });

    if (art) {
      // Compara la contraseña ingresada con el hash almacenado en la base de datos
      const passwordMatch = await bcrypt.compare(signInPassword, art.password);

      if (passwordMatch) {
        const artWithoutPassword = await Artesano.findOne({
          where: {
            id: art.id,
          },
          attributes: { exclude: ["password"] },
        });
        res.send({
          status: true,
          message: "has ingresado satisfactoriamente",
          art: artWithoutPassword,
        });
      } else {
        res.send({
          status: false,
          message: "Contraseña incorrecta",
          art: null,
        });
      }
    } else {
      res.send({
        status: false,
        message: "Usuario incorrecto",
        art: null,
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = loginArtesano;
