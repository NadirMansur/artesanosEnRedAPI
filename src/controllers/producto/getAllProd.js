const { Prod } = require("../../db");

const getAllProd = async (req, res, next) => {
  try {
    const prods = await Prod.findAll();
    if (prods) {
      res.send(prods);
    } else {
      res.send({ value: false, message: "no se encontraron Productos" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = getAllProd;
