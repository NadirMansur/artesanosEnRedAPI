const { Artesano } = require("../../db");

const setArtStatus = async (req, res, next) => {
  try {
    const art = await Artesano.findByPk(req.params.id);
    if (art) {
      const status = art.status
      await Artesano.update({ status: !status }, { where: { id: req.params.id } })

      res.status(204).json({
        message: "Productor actualizado satisfactoriamente",
        success: true,
      });
    } else {
      res.status(404).json({ message: "No se encontro el Productor" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = setArtStatus;
