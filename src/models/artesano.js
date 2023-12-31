const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Artesano",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tel: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      img_perfil: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      intro: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { paranoid: true }
  );
};
