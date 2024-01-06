////////////////////////////////////////////////////////////
const express = require("express");
const router = express.Router();

////////////////////////////////////////////////////////////
const getAllRubro = require("../controllers/rubro/getAllRubro");
const deleteRubro = require("../controllers/rubro/deleteRubro");
const createRubro = require("../controllers/rubro/createRubro");
const modifyRubro = require("../controllers/rubro/modifyRubro");
const restoreRubro = require("../controllers/rubro/restoreRubro");
// const allTags = require("../controllers/allTags");
// const filterBooks = require("../controllers/filterBooks");
// const findById = require("../controllers/findById");
// const allLanguage = require("../controllers/allLanguage");
// const allAuthors = require("../controllers/allAuthors");
//const getAllRatingBook = require('../controllers/ratingBook');

/* GET books listing. */
router.get("/", getAllRubro);
////////////////////////////

/* POST books listing. */
router.post("/", createRubro);
////////////////////////////

/* DELETE books listing. */
router.delete("/delete/:id", deleteRubro);
////////////////////////////

/* PUT books listing. */
router.put("/update", modifyRubro); //"/update/:id"
router.put("/restore/:id", restoreRubro);
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
