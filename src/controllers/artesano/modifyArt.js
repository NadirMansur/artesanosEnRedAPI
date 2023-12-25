const { Artesano } = require("../../db");

const modifyArt = async (req, res, next) => {
  try {
    const { username, tel, email, intro } = req.body;
    const art = await Artesano.findByPk(req.params.id);
    const artUpdate = {
      username: username,
      tel: tel,
      email: email,
      intro: intro,
    };
    if (art) {
      await Artesano.update(artUpdate);
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
