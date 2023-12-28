const express = require("express");
const { readUrl } = require("../controllers/homeController");
const router = express.Router()

router.get("/", readUrl);

module.exports = router;
