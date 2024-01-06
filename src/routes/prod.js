////////////////////////////////////////////////////////////
const express = require("express");
const router = express.Router();

////////////////////////////////////////////////////////////
const getAllProd = require("../controllers/producto/getAllProd");
const deleteProd = require("../controllers/producto/deleteProd");
const createProd = require("../controllers/producto/createProd");
const modifyProd = require("../controllers/producto/modifyProd");
const restoreProd = require("../controllers/producto/restoreProd");
// const allTags = require("../controllers/allTags");
// const filterBooks = require("../controllers/filterBooks");
// const findById = require("../controllers/findById");
// const allLanguage = require("../controllers/allLanguage");
// const allAuthors = require("../controllers/allAuthors");
//const getAllRatingBook = require('../controllers/ratingBook');

/* GET books listing. */
router.get("/", getAllProd);
////////////////////////////

/* POST books listing. */
router.post("/", createProd);
////////////////////////////

/* DELETE books listing. */
router.delete("/delete/:id", deleteProd);
////////////////////////////

/* PUT books listing. */
router.put("/update", modifyProd); //"/update/:id"
router.put("/restore/:id", restoreProd);
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
