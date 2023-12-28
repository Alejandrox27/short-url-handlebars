const Url = require("../models/Url")

const readUrl = async (req, res) => {
    const urls = [
        {origin: "www.google.com", shortURL: "fjadsk1"},
        {origin: "www.google.com", shortURL: "fjadsk2"},
        {origin: "www.google.com", shortURL: "fjadsk3"},
        {origin: "www.google.com", shortURL: "fjadsk4"},
    ]
    res.render("home", {urls: urls});
}

const addUrl = async (req, res) => {
    try{
        const url = new Url({origin: req.body.origin});
        await url.save();
        res.redirect("/");
    } catch (error){
        console.log(error);
        res.send("An error has ocurred");
    }
};

module.exports = {
    readUrl,
    addUrl,
};