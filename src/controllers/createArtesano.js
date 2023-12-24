const { Prod, Rubro, Artesano, Tag } = require("../db");
const cloudinary = require("../utils/cloudinary");

const createArt = async (req, res, next) => {
  try {
    const { username, tel, email, password, intro } = req.body;

    // req.files/////////////////////////////////////////////////////
    if (req.files === null) {
      return res.send("No se cargó imagen de perfil");
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No se cargó imagen de perfil");
    }
    ///////////////////////////////////////////////////////////////

    // Clodinary /////////////////////////////////////////////////////////////

    // import React, { useState } from 'react';

    // const App = () => {
    //   const [selectedFile, setSelectedFile] = useState(null);

    //   const handleFileChange = (event) => {
    //     const file = event.target.files[0];
    //     setSelectedFile(file);
    //   };

    //   const handleFileUpload = async () => {
    //     try {
    //       const formData = new FormData();
    //       formData.append('file', selectedFile);

    //       const response = await fetch('http://localhost:3001/upload', {
    //         method: 'POST',
    //         body: formData,
    //       });

    //       if (response.ok) {
    //         console.log('Imagen enviada correctamente');
    //       } else {
    //         console.error('Error al enviar la imagen');
    //       }
    //     } catch (error) {
    //       console.error('Error de red:', error);
    //     }
    //   };

    //   return (
    //     <div>
    //       <h1>Subir imagen</h1>
    //       <input type="file" onChange={handleFileChange} />
    //       <button onClick={handleFileUpload}>Subir</button>
    //     </div>
    //   );
    // };

    // export default App;
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

    const newPdr = await Rubro.create({
      username,
      tel,
      email,
      password,
      img_perfil: result[0],
      intro,
    });
    res.send({
      message: "Productor dado de alta satisfactoriamente!",
      newProd: newPdr,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = createArt;
