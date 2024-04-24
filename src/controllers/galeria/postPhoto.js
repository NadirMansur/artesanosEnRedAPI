const { Artesano , Galeria } = require("../../db");
const cloudinary = require("../../utils/cloudinary");

const postPhoto = async (req, res, next) => {
  try {
    const  formDataBody  = req.body;
    
    // req.files/////////////////////////////////////////////////////
    if (req.files === null) {
      return res.send("No se cargaron imagenes para el producto");
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No se cargaron imagenes para el producto");
    }
    ///////////////////////////////////////////////////////////////

    // //cloudinary ///////////////////////////////////////////////////////////

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

    // Artesano///////////////////////////////////////////////////////////////////////
    let ArtesanoIdBody = await Artesano.findOne({
      where: { id: formDataBody.id },
    });

    if (!ArtesanoIdBody) {
      return res
        .status(400)
        .send("El Emprendedor debe ser dado de alta primero");
    }
    //////////////////////////////////////////////////////////////////////////////////

    // Create psotPhoto/////////////////////////////////////////////////////////////
    const newImg = await Galeria.create({
      img: result,
      ArtId: formDataBody.id,
    });

    console.log(newImg, "nuevo img");
    /////////////////////////////////////////////////////////////////////////////////////

    res.send({
      status: true,
      message: "imagen subida satisfactoriamente!",
      newProd: newImg,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = postPhoto;
