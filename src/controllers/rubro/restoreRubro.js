const { Rubro } = require("../../db");

const restoreRubro = async (req, res, next) => {
  try {
    const rubro = await Rubro.findByPk(req.params.id, { paranoid: false });

    if (!rubro)
      return res
        .status(404)
        .json({ message: "Rubro no encontrado", status: false });

    await rubro.restore();

    return res
      .status(200)
      .json({
        message: "Rubro restaurado satisfactoriamente",
        status: true,
      });
  } catch (error) {
    next(error);
  }
};

module.exports = restoreRubro;
