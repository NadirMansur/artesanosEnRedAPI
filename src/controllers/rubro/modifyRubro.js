const { Rubro } = require("../../db");

const modifyRubro = async (req, res, next) => {
  try {
    const { rubro_name } = req.body;
    const rubroDB = await Rubro.findByPk(req.params.id);
    const rubroUpdate = {
      name: rubro_name,
    };
    if (rubroDB) {
      await Rubro.update(rubroUpdate);
      res.status(204).json({
        message: "Rubro actualizado satisfactoriamente",
        success: true,
      });
    } else {
      res.status(404).json({ message: "No se encontro el Rubro" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = modifyRubro;
