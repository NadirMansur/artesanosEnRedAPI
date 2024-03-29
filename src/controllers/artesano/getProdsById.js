const { Artesano, Prod, Rubro, Tag } = require("../../db");

const getProdsById = async (req, res, next) => {
  try {
    const { id } = req.query;
    const art = await Prod.findAll({
      attributes: ["id", "prod_name", "description", "img_1"],
      where: {
        ArtId: id,
      },
      include: [
        {
          model: Artesano,
          attributes: ["id", "username", "tel"],
        },
        {
          model: Rubro,
          attributes: ["id", "name"],
        },
        {
          model: Tag,
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    if (art) {
      // const result = []
      // art.map(art => {
      //     result.push(art.Prod.Rubro.name)
      // })
      // const productos = [...new Set(result)];
      res.status(200).send(art);
    } else {
      res.status(404).send({
        state: false,
        message: "no se encontro el emprendedor",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      state: false,
      message: "Error del servidor",
    });
  }
};

module.exports = getProdsById;
