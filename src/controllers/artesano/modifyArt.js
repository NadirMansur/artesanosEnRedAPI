const { Artesano } = require("../../db");

const modifyArt = async (req, res, next) => {
  try {
    const formDataBody = req.body;
    const art = await Artesano.findByPk(formDataBody.id);

    const artUpdate = (data) => {
      const obj = {};
      Object.entries(data).forEach(([key, value]) => {
        formDataBody.append(key, value);
        if (key === username) obj.username = value;
        if (key === tel) obj.tel = value;
        if (key === email) obj.email = value;
        if (key === intro) obj.intro = value;
      });

      return obj;
    };

    const artModify = artUpdate(formDataBody)
    
    if (art) {
      await Artesano.update(artModify);
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

module.exports = modifyArt;
