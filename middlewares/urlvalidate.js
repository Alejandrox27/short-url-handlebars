const { URL } = require("url");

const urlValidate = (req, res, next) => {
    try {
        const { origin } = req.body;
        const urlFrontend = new URL(origin);
        if (urlFrontend.origin !== "null") {
            return next()
        }
        throw new Error("not valid url 😲");
    } catch (error) {
        req.flash("messages", [{msg: error.message}]);
        return res.redirect("/");
    }
}

module.exports = urlValidate;