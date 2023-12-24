const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Favorite", {
    favorites_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },{paranoid: true});
};
