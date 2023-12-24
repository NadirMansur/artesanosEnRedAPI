const { Artesano } = require("../../db");

const deleteArt = async (req, res, next) => {
  try {
    const art = await Artesano.findByPk(req.params.id);
    if (art) {
      await art.destroy();
      res
        .status(204)
        .json({
          message: "Productor dado de baja satisfactoriamente",
          success: true,
        });
    } else {
      res.status(404).json({ message: "No se encontro el Productor" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = deleteArt;
