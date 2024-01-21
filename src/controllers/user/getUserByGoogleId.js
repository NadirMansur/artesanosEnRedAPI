const { User } = require("../../db");

const getUserByGoogleId = async (req, res, next) => {
  try {
    const { googleId } = req.query;

    const user = await User.findOne({
      where: {
        googleId: googleId,
      },
    });
    if (user) {
      res.send(user);
    } else {
      res.send({
        state: false,
        message: "no se encontro el usuario",
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = getUserByGoogleId;
