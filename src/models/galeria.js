const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Galeria",
    {
      /// id seria el codigo ISBN del libro ///
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { paranoid: true }
  );
};
