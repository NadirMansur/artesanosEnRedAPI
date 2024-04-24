////////////////////////////////////////////////////////////
const express = require("express");
const router = express.Router();

////////////////////////////////////////////////////////////
const getPhotodById = require("../controllers/galeria/getPhotodById");
const postPhoto = require("../controllers/galeria/postPhoto");

/* GET prod listing. */
router.get("/getGaleriaById", getPhotodById);
////////////////////////////

/* POST prod listing. */
router.post("/", postPhoto);
////////////////////////////

/* DELETE prod listing. */
// router.delete("/delete/:id", deleteProd);
////////////////////////////

/* PUT prod listing. */
// router.put("/update", modifyProd); //"/update/:id"
// router.put("/restore/:id", restoreProd);
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
