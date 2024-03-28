const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Prod", {
    /// id seria el codigo ISBN del libro ///
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    prod_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img_1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    img_3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    img_4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    img_5: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false, 
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
  },{paranoid:true});
};

