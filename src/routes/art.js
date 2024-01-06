////////////////////////////////////////////////////////////
const express = require("express");
const router = express.Router();

////////////////////////////////////////////////////////////
const getAllArt = require("../controllers/artesano/getAllArt");
const deleteArt = require("../controllers/artesano/deleteArt");
const createArtesano = require("../controllers/artesano/createArtesano");
const modifyArt = require("../controllers/artesano/modifyArt");
const restoreArt = require("../controllers/artesano/restoreArt");
// const allTags = require("../controllers/allTags");
// const filterBooks = require("../controllers/filterBooks");
// const findById = require("../controllers/findById");
// const allLanguage = require("../controllers/allLanguage");
// const allAuthors = require("../controllers/allAuthors");
//const getAllRatingBook = require('../controllers/ratingBook');

/* GET books listing. */
router.get("/", getAllArt);
////////////////////////////

/* POST books listing. */
router.post("/", createArtesano);
////////////////////////////

/* DELETE books listing. */
router.delete("/delete/:id", deleteArt);
////////////////////////////

/* PUT books listing. */
router.put("/update", modifyArt); //"/update/:id"
router.put("/restore/:id", restoreArt);
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
