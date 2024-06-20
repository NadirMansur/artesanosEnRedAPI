const { Galeria } = require("../../db");

const deletePhoto = async (req, res, next) => {
  const { id } = req.query;
  try {
    const photo = await Galeria.findByPk(id);
    if (photo) {
      await photo.destroy();
      res.status(204).json({
        message: "Foto eliminada satisfactoriamente",
        success: true,
      });
    } else {
      res.status(404).json({ message: "No se encontro el la Imagen" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = deletePhoto;
