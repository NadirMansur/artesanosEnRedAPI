const { Prod } = require("../../db");

const restoreProd = async (req, res, next) => {
  try {
    const pdr = await Prod.findByPk(req.params.id, { paranoid: false });

    if (!pdr)
      return res
        .status(404)
        .json({ message: "Producto no encontrado", status: false });

    await pdr.restore();

    return res
      .status(200)
      .json({
        message: "Producto restaurado satisfactoriamente",
        status: true,
      });
  } catch (error) {
    next(error);
  }
};

module.exports = restoreProd;
