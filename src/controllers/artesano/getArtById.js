const { Art } = require("../../db");

const getArtById = async (req, res, next) => {
  try {
    const { id } = req.query;

    const art = await Art.findOne({
      where: {
        id: id,
      },
    });
    if (art) {
      res.send(art);
    } else {
      res.send({
        state: false,
        message: "no se encontro el emprendedor",
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = getArtById;
