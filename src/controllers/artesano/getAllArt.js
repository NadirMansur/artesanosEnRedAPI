const { Artesano } = require("../../db");

const getAllArt = async (req, res, next) => {
  // console.log("entre al controller getAllArt");
  try {
    const arts = await Artesano.findAll();
    if (arts) {
      res.send(arts);
    }else{
        res.send({value: false, message:"no se encontraron artesanos"})
    }
  } catch (error) {
    next(error);
  }
};
module.exports = getAllArt;
