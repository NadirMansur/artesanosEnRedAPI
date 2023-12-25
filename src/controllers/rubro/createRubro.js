const { Rubro } = require("../../db");

const createRubro = async (req, res, next) => {
  try {
    const { rubro } = req.body;
    const newRubro = await Rubro.create({
      name: rubro,
    });
    res.send({
      message: "Rubro dado de alta satisfactoriamente!",
      newProd: newRubro,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = createRubro;
