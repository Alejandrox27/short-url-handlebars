const express = require("express");
const router = express.Router()

router.get("/", (req, res) => {
    const urls = [
        {origin: "www.google.com", shortURL: "fjadsk1"},
        {origin: "www.google.com", shortURL: "fjadsk2"},
        {origin: "www.google.com", shortURL: "fjadsk3"},
        {origin: "www.google.com", shortURL: "fjadsk4"},
    ]
    res.render("home", {urls: urls});
})

module.exports = router;
