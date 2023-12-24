const express = require("express");
const router = express.Router();
// const allBooks = require("../controllers/allBooks"); //se hizo cambio por B mayuscula el archivo allBooks.js
// const allTags = require("../controllers/allTags");
// const filterBooks = require("../controllers/filterBooks");
// const findById = require("../controllers/findById");
// const allLanguage = require("../controllers/allLanguage");
// const allAuthors = require("../controllers/allAuthors");
// const upDateBook = require("../controllers/upDateBook");
// const restoreBook = require("../controllers/restoreBook");
const deleteProd = require("../controllers/deleteProd");
const createProd = require("../controllers/createProd");
//const getAllRatingBook = require('../controllers/ratingBook');

/* GET books listing. */
////////////////////////////
/* POST books listing. */
router.post("/", createProd);
////////////////////////////
/* DELETE books listing. */
router.delete("/delete/:id", deleteProd); /*, getDeletedBooks*/
////////////////////////////
/* PUT books listing. */
////////////////////////////

//router.get("/", allBooks);
//router.get("/language", allLanguage);
//router.get("/removed", getDeletedBooks);
//router.get("/book/:id", findById);
//router.get("/filter", filterBooks);
//router.get("/tags", allTags);
//router.get("/authors", allAuthors);
//router.put("/update/:id", upDateBook);
//router.put("/restore/:id", restoreBook);
//router.get("/ratings",getAllRatingBook)

module.exports = router;
