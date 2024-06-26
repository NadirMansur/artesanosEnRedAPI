const { Galeria } = require("../../db");

const getPhotodById = async (req, res, next) => {
  try {
    const { id } = req.query;
    const galeria = await Galeria.findAll({
      attributes: ["id", "img"],
      where: {
        ArtId: id,
      },
    });
    if (galeria) {
      res.status(200).send(galeria);
    } else {
      res.status(404).send({
        state: false,
        message: "no se encontro el galeria",
      });
    }
  } catch (err) {
    res.status(500).send({
      state: false,
      message: "Error del servidor",
    });
  }
};

module.exports = getPhotodById;
