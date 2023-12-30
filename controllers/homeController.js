const Url = require("../models/Url")
const { nanoid } = require("nanoid")

const readUrl = async (req, res) => {
    //console.log(req.user);
    try{
        urls = await Url.find({user: req.user.id}).lean(); //lean (javascript Object)
        res.render("home", {urls: urls});
    }catch(error){
        req.flash("messages", [{ msg: error.message }]);
        return res.redirect("/");
    }
}

const addUrl = async (req, res) => {
    const { origin } = req.body;

    try{
        const url = new Url({ origin: origin, shortURL: nanoid(8), user: req.user.id });
        await url.save();
        req.flash("messages", [{ msg: "Url Added" }]);
        res.redirect("/");
    } catch (error){
        req.flash("messages", [{ msg: error.message }]);
        return res.redirect("/");
    }
};

const deleteUrl = async( req, res ) => {
    const { id } = req.params;
    try{
        //await Url.findByIdAndDelete(id);
        const url = await Url.findById(id);
        
        if(!url.user === req.user.id.toString()){
            throw new Error("Is not your Url")
        }

        await Url.findByIdAndDelete(id);
        req.flash("messages", [{msg: "Url Deleted"}])

        res.redirect("/");
    }catch(error) {
        req.flash("messages", [{ msg: error.message }]);
        return res.redirect("/");
    }
};

const editUrlForm = async(req, res) => {
    const { id } = req.params;
    try{
        const url = await Url.findById(id).lean();
        res.render("home", {url})
    }catch(error){
        req.flash("messages", [{ msg: error.message }]);
        return res.redirect("/");
    }
};

const editUrl = async(req, res) => {
    const { id } = req.params;
    const { origin } = req.body;
    try{
        const url = await Url.findById(id).lean();
        const id_user = req.user.id;

        if(!url.user === id_user){
            throw new Error("Is not your Url")
        }
        
        await Url.findByIdAndUpdate(id, {origin: origin});

        res.redirect("/");

    }catch(error){
        req.flash("messages", [{ msg: error.message }]);
        return res.redirect("/");
    }
};

const redirectTo = async(req, res) => {
    const { shortUrl } = req.params;
    try {
        const urlDB = await Url.findOne({shortURL: shortUrl});
        res.redirect(urlDB.origin);
    }catch(error){
        req.flash("messages", [{ msg: error.message }]);
        return res.redirect("/");
    }
}

module.exports = {
    readUrl,
    addUrl,
    deleteUrl,
    editUrlForm,
    editUrl,
    redirectTo,
};