const { Prod: Rubro } = require("../../db");

const getAllRubro = async (req, res, next) => {
  // console.log("entre al controller getAllRubro");
  try {
    const rubros = await Rubro.findAll();
    if (rubros) {
      res.send(rubros);
    } else {
      res.send({ value: false, message: "no se encontraron Rubros" });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = getAllRubro;
