require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const session = require('express-session');
const passport = require("passport");
const fileUpload = require("express-fileupload");
const path = require("path");
const cookieParser = require("cookie-parser");
const { User } = require("./db");

const logger = require("morgan");
//const morgan = require('morgan');

var cors = require("cors");
const indexRouter = require("./routes/index");
//const usersRouter = require('./routes/users');
require("./db.js");
require("./auth")

const { SESSION_SECRET } = process.env;


const app = express();

////////////////////session/////////////
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));
///////////////////////session/////////////
// Configuración de Passport
app.use(passport.initialize());
app.use(passport.session());
// Configuración de Passport
// Configuración serializeUser y deserializeUser
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    // Busca y devuelve el usuario desde la base de datos según el id proporcionado
    const user = await User.findByPk(id);

    if (user) {
      done(null, user);
    } else {
      done(null, null);
    }
  } catch (err) {
    done(err, null);
  }
});
// Configuración serializeUser y deserializeUser

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use(cors()); // Use this after the variable declaration

app.use(logger("dev"));
//app.use(morgan('combined')); 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

app.use(
  fileUpload({
    useTempFiles: true,
    limits: { fileSize: 50 * 1024 * 1024 },
    abortOnLimit: true,
    responseOnLimit: "El archivo es demasiado grande",
    uploadTimeout: 0,
  })
);

app.use("/", indexRouter);
//app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.error("ESTRUCTURA DEL ERROR!:",err);
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
