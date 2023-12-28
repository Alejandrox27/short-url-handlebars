const Url = require("../models/Url")
const { nanoid } = require("nanoid")

const readUrl = async (req, res) => {

    let urls = {}
    
    try{
        urls = await Url.find().lean(); //lean (javascript Object)
    }catch(error){
        console.log(error);
        res.send("an error has ocurred")
    }

    res.render("home", {urls: urls});
}

const addUrl = async (req, res) => {
    try{
        const url = new Url({ origin: req.body.origin, shortURL: nanoid(8) });
        await url.save();
        res.redirect("/");
    } catch (error){
        console.log(error);
        res.send("An error has ocurred");
    }
};

const deleteUrl = async( req, res ) => {
    const { id } = req.params;
    try{
        await Url.findByIdAndDelete(id);
        res.redirect("/");
    }catch(error) {
        console.log(error);
        res.send("An error has ocurred")
    }
};

const editUrlForm = async(req, res) => {
    const { id } = req.params;
    try{
        const url = await Url.findById(id).lean();
        res.render("home", {url})
    }catch(error){
        console.log(error);
        res.send("something failed");
    }
};

const editUrl = async(req, res) => {
    const { id } = req.params;
    const { origin } = req.body;
    try{
        await Url.findByIdAndUpdate(id, {origin: origin});
        res.redirect("/");

    }catch(error){
        console.log(error);
        res.send("something failed");
    }
};

const redirect = async(req, res) => {
    const { shortUrl } = req.params;
    try {
        const urlDB = await Url.findOne({shortURL: shortUrl});
        res.redirect(urlDB.origin);
    }catch(error){
        res.send("shomething went wrong");
    }
}

module.exports = {
    readUrl,
    addUrl,
    deleteUrl,
    editUrlForm,
    editUrl,
    redirect,
};