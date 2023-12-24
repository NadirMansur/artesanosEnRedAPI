require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const isLocal = process.env.NODE_ENV !== "production";

// Utiliza las variables de entorno correspondientes
const DB_USER = isLocal ? process.env.DB_USER : process.env.RW_USERdb;
const DB_PASSWORD = isLocal ? process.env.DB_PASSWORD : process.env.RW_PASSWORD;
const DB_HOST = isLocal ? process.env.DB_HOST : process.env.RW_URLdb;
const DB_PORT = isLocal ? process.env.DB_PORT : process.env.RW_PORTdb;
const DB_NAME = isLocal ? process.env.DB_NAME : process.env.RW_DB_NAME;


// Crea la conexión a la base de datos
const sequelize = new Sequelize(
  `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];


// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
console.log(sequelize.models);
const {
  Artesano,
  Favorite,
  Prod,
  Rubro,
  Tag,
  User,
  //Rating_avg_book,
} = sequelize.models;


/////////////////////////////////////////////////////////////////////
Prod.hasMany(Favorite, {foreignKey:'ProdId'}) //a -> b -> b
Favorite.belongsTo(Prod, {foreignKey:'ProdId'})  //a -> b -> a
/////////////////////////////////////////////////////////////////////
User.hasMany(Favorite, {foreignKey:'UserId'}) //a -> b -> b
Favorite.belongsTo(User, {foreignKey:'UserId'}) //a -> b -> a
/////////////////////////////////////////////////////////////////////
Artesano.hasOne(Prod, {foreignKey:'ArtId'}) //a -> b -> b
Prod.belongsTo(Artesano, {foreignKey:'ArtId'}) //a -> b -> a
/////////////////////////////////////////////////////////////////////
Rubro.hasOne(Prod, {foreignKey:'RubroId'}) //a -> b -> b
Prod.belongsTo(Rubro, {foreignKey:'RubroId'}) //a -> b -> a
/////////////////////////////////////////////////////////////////////
Prod.belongsToMany(Tag, { through: 'Prod_Tag' });
/////////////////////////////////////////////////////////////////////

// /////////////////////////////////////////////////////////////////////
module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
