const { Prod, Rubro, Artesano, Tag } = require("../../db");
const cloudinary = require("../../utils/cloudinary");

const createProd = async (req, res, next) => {
  try {
    const  formDataBody  = req.body;

    console.log("formDataBody, ", formDataBody);
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

    ////////////////////////////////////////////////////////////////
    if (formDataBody.title === 0 || formDataBody.description === 0)
      return res.send(
        "Nomrbe del producto, Descripcion del producto y el precio son requeridos"
      );
    //////////////////////////////////////////////////////////////////////
    // seguir de aca en adelante
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

    // Rubro///////////////////////////////////////////////////////////////////////
    let RubroIdBody = await Rubro.findOne({
      where: { name: formDataBody.rubro },
    });

    if (!RubroIdBody) {
      return res.status(400).send("El Rubro debe ser dado de alta primero");
    }
    //////////////////////////////////////////////////////////////////////////////////

    // Tags///////////////////////////////////////////////////////////////////////////
    const tagNames = [
      formDataBody.tag1,
      formDataBody.tag2,
      formDataBody.tag3,
      formDataBody.tag4,
    ]; // Convierte en arreglo si no lo es
    const tagsBody = await Promise.all(
      tagNames.map(async (tagName) => {
        let tag = await Tag.findOne({
          where: { name: tagName },
        });

        if (!tag) {
          tag = await Tag.create({ name: tagName });
        }

        return tag;
      })
    );
    ///////////////////////////////////////////////////////////////////////////
    // Create Book/////////////////////////////////////////////////////////////
    const newProd = await Prod.create({
      prod_name: formDataBody.title,
      img_1: result,
      description: formDataBody.description,
      ArtId: formDataBody.id,
      RubroId: RubroIdBody.id,
    });

    await newProd.setTags(tagsBody);

    console.log(newProd, "nuevo Prod");
    /////////////////////////////////////////////////////////////////////////////////////

    res.send({
      status: true,
      message: "Producto creado satisfactoriamente!",
      newProd: newProd,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createProd;
