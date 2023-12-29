const express = require("express");
const { readUrl, addUrl, deleteUrl, editUrlForm, editUrl, redirectTo } = require("../controllers/homeController");
const urlValidate = require("../middlewares/urlvalidate");
const verifyUser = require("../middlewares/verifyUser");
const router = express.Router()

router.get("/", verifyUser, readUrl);
router.post("/", urlValidate, addUrl);
router.get("/delete/:id", deleteUrl);
router.get("/edit/:id", editUrlForm);
router.post("/edit/:id", urlValidate, editUrl)
router.get("/:shortUrl", redirectTo)

module.exports = router;
