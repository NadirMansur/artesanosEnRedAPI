const { Artesano, Prod, Rubro } = require("../../db");

const getRubrosById = async (req, res, next) => {
  try {
    const { id } = req.query;
    const art = await Artesano.findAll({
      attributes: ["id", "username"],
      where: {
        id: id,
      },
      include: [
        {
          model: Prod,
          attributes: ["id", "prod_name"],
          include: [
            {
              model: Rubro,
              attributes: ["id", "name"],
            },
          ],
        },
      ],
    });
    if (art) {
        const result = []
        art.map(art => {
            result.push(art.Prod.Rubro.name)
        })
        const rubros = [...new Set(result)];
        res.status(200).send(rubros);
    } else {
      res.status(404).send({
        state: false,
        message: "no se encontro el emprendedor",
      });
    }
  } catch (err) {
    console.log(err)
    res.status(500).send({
      state: false,
      message: "Error del servidor",
    });
  }
};

module.exports = getRubrosById;
