const { Prod: Rubro } = require("../../db");

const deleteRubro = async (req, res, next) => {
  try {
    const rubro = await Rubro.findByPk(req.params.id);
    if (rubro) {
      await rubro.destroy();
      res
        .status(204)
        .json({
          message: "Rubro dado de baja satisfactoriamente",
          success: true,
        });
    } else {
      res.status(404).json({ message: "No se encontro el Rubro" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = deleteRubro;
