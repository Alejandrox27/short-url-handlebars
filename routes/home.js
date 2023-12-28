const express = require("express");
const { readUrl, addUrl, deleteUrl } = require("../controllers/homeController");
const router = express.Router()

router.get("/", readUrl);
router.post("/", addUrl);
router.get("/delete/:id", deleteUrl)

module.exports = router;
