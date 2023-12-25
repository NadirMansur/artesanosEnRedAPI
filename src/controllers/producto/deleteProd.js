const { Prod } = require("../../db");

const deleteProd = async (req, res, next) => {
  try {
    const prod = await Prod.findByPk(req.params.id);
    if (prod) {
      await prod.destroy();
      res
        .status(204)
        .json({
          message: "Producto dado de baja satisfactoriamente",
          success: true,
        });
    } else {
      res.status(404).json({ message: "No se encontro el Producto" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = deleteProd;
