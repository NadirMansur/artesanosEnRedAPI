const { Artesano } = require("../../db");

const getArtById = async (req, res, next) => {
  try {
    const { id } = req.query;
    const art = await Artesano.findOne({
      where: {
        id: id,
      },
    });
    if (art) {
      res.send(art);
    } else {
      res.status(404).send({
        state: false,
        message: "no se encontro el emprendedor",
      });
    }
  } catch (err) {
    res.status(500).send({
      state: false,
      message: "Error del servidor",
    });
  }
};

module.exports = getArtById;