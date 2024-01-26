const bcrypt = require("bcrypt");
const { Artesano } = require("../../db");
const cloudinary = require("../../utils/cloudinary");

const createArt = async (req, res, next) => {
  try {
    const formData = req.body;

    // req.files/////////////////////////////////////////////////////
    if (req.files === null) {
      return res.send("No se cargó imagen de perfil");
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No se cargó imagen de perfil");
    }
    let result = "";
    try {
      if (!req.files || !req.files.file) {
        return res.status(400).send("No se ha enviado ninguna imagen");
      }
      const file = req.files.file;
      //console.log("ACA MUESTRO EL VALOR DE file", file);
      result = await cloudinary(file.tempFilePath);
      if (result) {
        console.log("Imagen subida a Cloudinary:", result);
        console.log("typeof(result):", typeof result);
      } else {
        console.error("Error al subir la imagen a Cloudinary:", error);
        res.status(500).send("Error al subir la imagen a Cloudinary");
      }
    } catch (error) {
      console.error("Error al subir la imagen a Cloudinary:", error);
      res.status(500).send("Error al subir la imagen a Cloudinary");
    }
    ///////////////////////////////////////////////////////////////

    const hashedPassword = await bcrypt.hash(formData.signUpPassword, 10);
    console.log("typeof(hashedPassword):", typeof hashedPassword);
    console.log("(hashedPassword):", hashedPassword);

    const newArt = await Artesano.create({
      username: formData.signUpName,
      tel: formData.tel,
      email: formData.signUpEmail,
      password: hashedPassword,
      img_perfil: result,
      intro: formData.intro,
    });


    const artWithoutPassword = await Artesano.findOne({
      where: {
        id: newArt.id,
      },
      attributes: { exclude: ['password'] }, 
    });

    if (artWithoutPassword) {
      res.send({
        status: true,
        message: "Productor dado de alta satisfactoriamente!",
        newArt: artWithoutPassword,
      });
    }else{
      res.send({
        status: false,
        message: "Error al crear el usuario",
        newArt: false,
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = createArt;
