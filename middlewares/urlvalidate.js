const { URL } = require("url");

const urlValidate = (req, res, next) => {
    try {
        const { origin } = req.body;
        const urlFrontend = new URL(origin);
        if (urlFrontend.origin !== "null") {
            if (
                urlFrontend.protocol === "http:" ||
                urlFrontend.protocol === "https:"
            ) {
                return next();
            }
            throw new Error("https:// or http:// expected");
        }
        throw new Error("not valid url 😲");
    } catch (error) {
        res.send("not valid url")
        return res.redirect("/");
    }
}

module.exports = urlValidate;