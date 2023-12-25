const { Prod, Rubro, Tag } = require("../../db");

const modifyPdr = async (req, res, next) => {
  try {
    const { prod_name, description, price, RubroId, tags } = req.body;

    /////////////////////////////////////////////////////////////////////
    if (
      prod_name.length === 0 ||
      description.length === 0 ||
      price.length === 0
    )
      return res.send(
        "Nomrbe del producto, Descripcion del producto y el precio son requeridos"
      );
    //////////////////////////////////////////////////////////////////////

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

    ///////////////////////////////////////////////////////////////////////////
    const pdr = await Prod.findByPk(req.params.id);
    const pdrUpdate = {
      prod_name,
      // img_1,
      // img_2,
      // img_3,
      // img_4,
      // img_5,
      description,
      price,
      RubroId: RubroIdBody.id,
    };
    if (pdr) {
      await Prod.update(pdrUpdate);
      await pdr.setTags(tagsBody);


      res.status(204).json({
        message: "Producto actualizado satisfactoriamente",
        success: true,
      });
    } else {
      res
        .status(404)
        .json({ message: "No se encontro el Producto", success: true });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = modifyPdr;
