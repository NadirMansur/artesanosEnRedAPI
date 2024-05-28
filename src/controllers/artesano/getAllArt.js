const { Artesano } = require("../../db");

const getAllArt = async (req, res, next) => {
  try {
    const arts = await Artesano.findAll({
      attributes: { exclude: ['password',"tel","email","createdAt", "deletedAt", "updatedAt","username","intro","img_perfil"] }
    });
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
