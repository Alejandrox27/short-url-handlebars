const express = require("express");
const { readUrl, addUrl, deleteUrl, editUrlForm, editUrl } = require("../controllers/homeController");
const urlValidate = require("../middlewares/urlvalidate");
const router = express.Router()

router.get("/", readUrl);
router.post("/", urlValidate, addUrl);
router.get("/delete/:id", deleteUrl);
router.get("/edit/:id", editUrlForm);
router.post("/edit/:id", urlValidate, editUrl)


module.exports = router;
