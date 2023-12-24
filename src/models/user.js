const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username:{
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

    aud: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    azp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    family_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    given_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    locale: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sub: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },{paranoid:true});
};
