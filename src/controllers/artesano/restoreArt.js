const { Artesano } = require("../../db");

const upDateArt = async (req, res, next) => {
  try {
    const art = await Artesano.findByPk(req.params.id, { paranoid: false });

    if (!art)
      return res
        .status(404)
        .json({ message: "Productor no encontrado", status: false });

    await art.restore();

    return res
      .status(200)
      .json({
        message: "Productor restaurado satisfactoriamente",
        status: true,
      });
  } catch (error) {
    next(error);
  }
};

module.exports = upDateArt;
