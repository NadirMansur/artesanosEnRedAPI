const bcrypt = require("bcrypt");
const { Artesano } = require("../../db");
const cloudinary = require("../../utils/cloudinary");

const createArt = async (req, res, next) => {
  try {
    const formData = req.body;
    formData;

    // req.files/////////////////////////////////////////////////////
    if (req.files === null) {
      return res.send("No se cargó imagen de perfil");
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No se cargó imagen de perfil");
    }

    const result = [];
    try {
      if (!req.files || !req.files.file) {
        return res.status(400).send("No se ha enviado ninguna imagen");
      }

      const result = await cloudinary.uploader.upload(req.files.file);
      if (result) {
        console.log("Imagen subida a Cloudinary:", result);
        result[0] = result;
      } else {
        console.error("Error al subir la imagen a Cloudinary:", error);
        res.status(500).send("Error al subir la imagen a Cloudinary");
      }
    } catch (error) {
      console.error("Error al subir la imagen a Cloudinary:", error);
      res.status(500).send("Error al subir la imagen a Cloudinary");
    }
    ///////////////////////////////////////////////////////////////
    const hashedPassword = bcrypt.hash(formData.password);

    const newArt = await Artesano.create({
      username: formData.username,
      tel: formData.tel,
      email: formData,
      email,
      password: hashedPassword,
      img_perfil: result[0],
      intro: formData.intro,
    });
    res.send({
      status: true,
      message: "Productor dado de alta satisfactoriamente!",
      newArt: newArt,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = createArt;
