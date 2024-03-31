////////////////////////////////////////////////////////////
const express = require("express");
const router = express.Router();

////////////////////////////////////////////////////////////
const getAllArt = require("../controllers/artesano/getAllArt");
const getArtById = require("../controllers/artesano/getArtById");
const deleteArt = require("../controllers/artesano/deleteArt");
const createArtesano = require("../controllers/artesano/createArtesano");
const loginArtesano = require("../controllers/artesano/loginArtesano");
const modifyArt = require("../controllers/artesano/modifyArt");
const restoreArt = require("../controllers/artesano/restoreArt");
const getRubrosById = require("../controllers/artesano/getRubrosById"); 
const getProdsById = require("../controllers/artesano/getProdsById"); 
const setArtStatus = require("../controllers/artesano/setArtStatus"); 
// const allTags = require("../controllers/allTags");
// const filterBooks = require("../controllers/filterBooks");
// const findById = require("../controllers/findById");
// const allLanguage = require("../controllers/allLanguage");
// const allAuthors = require("../controllers/allAuthors");
//const getAllRatingBook = require('../controllers/ratingBook');

/* GET art listing. */
router.get("/", getAllArt);
router.get("/getById", getArtById);
router.get("/getRubrosById", getRubrosById);
router.get("/getProdsById", getProdsById);
////////////////////////////

/* POST art listing. */
router.post("/", createArtesano);
router.post("/login", loginArtesano);
////////////////////////////

/* DELETE art listing. */
router.delete("/delete/:id", deleteArt);
////////////////////////////

/* PUT art listing. */
router.put("/update", modifyArt); //"/update/:id"
router.put("/restore/:id", restoreArt);
router.put("/setStatus/:id",setArtStatus)
////////////////////////////

//router.get("/", allBooks);
//router.get("/language", allLanguage);
//router.get("/removed", getDeletedBooks);
//router.get("/book/:id", findById);
//router.get("/filter", filterBooks);
//router.get("/tags", allTags);
//router.get("/authors", allAuthors);
//router.get("/ratings",getAllRatingBook)

module.exports = router;
