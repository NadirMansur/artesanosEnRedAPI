const { Prod, Rubro, Artesano, Tag } = require("../../db");
const cloudinary = require("../../utils/cloudinary");

const createProd = async (req, res, next) => {
  try {
    const { prod_name, description, ArtId, RubroId, tags } = req.body;

    ////////////////////////////////////////////////////////////////
    if (prod_name.length === 0 || description.length === 0)
      return res.send(
        "Nomrbe del producto, Descripcion del producto y el precio son requeridos"
      );
    //////////////////////////////////////////////////////////////////////

    // req.files/////////////////////////////////////////////////////
    if (req.files === null) {
      return res.send("No se cargaron imagenes para el producto");
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No se cargaron imagenes para el producto");
    }
    ///////////////////////////////////////////////////////////////

    // Artesano///////////////////////////////////////////////////////////////////////
    let ArtesanoIdBody = await Artesano.findOne({
      where: { id: ArtId },
    });

    if (!ArtesanoIdBody) {
      return res
        .status(400)
        .send("El Emprendedor debe ser dado de alta primero");
    }
    //////////////////////////////////////////////////////////////////////////////////

    // Rubro///////////////////////////////////////////////////////////////////////
    let RubroIdBody = await Rubro.findOne({
      where: { id: RubroId },
    });

    if (!RubroIdBody) {
      return res.status(400).send("El Rubro debe ser dado de alta primero");
    }
    //////////////////////////////////////////////////////////////////////////////////

    // Tags///////////////////////////////////////////////////////////////////////////
    const tagNames = Array.isArray(tags) ? tags : [tags]; // Convierte en arreglo si no lo es
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

    // //cloudinary ///////////////////////////////////////////////////////////
    // const file = await cloudinary(req.files.image.tempFilePath);
    // console.log(file, "file");
    // image = file;

    const uploadedImages = [];
    try {
      for (const file of req.files.file) {
        const result = await cloudinary.uploader.upload(
          file
          //   , {
          //   folder: "nombre_de_carpeta", // Opcional: especifica la carpeta en Cloudinary
          //   resource_type: "auto", // Auto detectar el tipo de recurso (imagen, video, etc.)
          // }
        );
        uploadedImages.push(result);
      }
      console.log("Imágenes subidas a Cloudinary:", uploadedImages);
    } catch (error) {
      console.error("Error al subir imágenes a Cloudinary:", error);
      res.status(500).send("Error al subir imágenes a Cloudinary");
    }

    // import React from 'react';

    // const App = () => {
    //   const handleFileUpload = async (event) => {
    //     const files = event.target.files;

    //     try {
    //       const formData = new FormData();

    //       for (let i = 0; i < files.length; i++) {
    //         formData.append('file', files[i]);
    //       }

    //       const response = await fetch('http://localhost:3001/upload', {
    //         method: 'POST',
    //         body: formData,
    //       });

    //       if (response.ok) {
    //         console.log('Imágenes enviadas correctamente');
    //       } else {
    //         console.error('Error al enviar imágenes');
    //       }
    //     } catch (error) {
    //       console.error('Error de red:', error);
    //     }
    //   };

    //   return (
    //     <div>
    //       <h1>Subir imágenes</h1>
    //       <input type="file" multiple onChange={handleFileUpload} />
    //     </div>
    //   );
    // };

    // export default App;

    const img_1 = uploadedImages[0];
    // Create Book/////////////////////////////////////////////////////////////
    const newProd = await Prod.create({
      prod_name,
      img_1,
      description,
      ArtId: ArtesanoIdBody.id,
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
