const { Artesano } = require("../../db");

const modifyArt = async (req, res, next) => {
  try {
    const formDataBody = req.body;
    const { id } = formDataBody;
    const art = await Artesano.findByPk(formDataBody.id);

    const artUpdate = (data) => {
      const obj = {};
      for (const [key, value] of Object.entries(data)) {
        if (key === "username") obj.username = value;
        if (key === "tel") obj.tel = value;
        if (key === "email") obj.email = value;
        if (key === "intro") obj.intro = value;
      }
      return obj;
    };

    const artModify = artUpdate(formDataBody);

    if (art) {
      await Artesano.update(artModify, {
        where: { id: id },
      });
      res.status(200).json({
        message: "Datos actualizados con éxito",
        success: true,
      });
    } else {
      res.status(404).json({ message: "No se encontro el Productor" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = modifyArt;
