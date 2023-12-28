const express = require("express");
const { readUrl, addUrl } = require("../controllers/homeController");
const router = express.Router()

router.get("/", readUrl);
router.post("/", addUrl);

module.exports = router;
