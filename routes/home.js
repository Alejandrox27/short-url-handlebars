const express = require("express");
const { readUrl, addUrl, deleteUrl, editUrlForm, editUrl, redirectTo } = require("../controllers/homeController");
const urlValidate = require("../middlewares/urlvalidate");
const verifyUser = require("../middlewares/verifyUser");
const router = express.Router()

router.get("/", verifyUser, readUrl);
router.post("/", verifyUser, urlValidate, addUrl);
router.get("/delete/:id", verifyUser, deleteUrl);
router.get("/edit/:id", verifyUser, editUrlForm);
router.post("/edit/:id", verifyUser, urlValidate, editUrl)
router.get("/:shortUrl", redirectTo)

module.exports = router;
