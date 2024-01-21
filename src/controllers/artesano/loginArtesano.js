const bcrypt = require('bcrypt');
const { Art } = require('../../db');

const loginArtesano = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const art = await Art.findOne({
      where: {
        username: username,
      },
    });

    if (art) {
      // Compara la contraseña ingresada con el hash almacenado en la base de datos
      const passwordMatch = await bcrypt.compare(password, art.password);

      if (passwordMatch) {
        res.send({
          status: true,
        });
      } else {
        res.send({
          status: false,
          message: 'Contraseña incorrecta',
        });
      }
    } else {
      res.send({
        status: false,
        message: 'Usuario incorrecto',
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = loginArtesano;
