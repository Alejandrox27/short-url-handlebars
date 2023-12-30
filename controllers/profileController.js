const formidable = require("formidable");
const path = require("path");

module.exports.formProfile = async (req, res) => {
    res.render("profile")
}

module.exports.editPhotoProfile = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.maxFileSize = 50 * 1024 * 1024 // 50 MB

    form.parse(req, async(err, fields, files) => {
        try{
            if(err){
                throw new Error("failed the image upload")
            }
            
            const file = files.myFile;

            if(file.originalFilename === ""){
                throw new Error("Please add and image");
            };

            const imageTypes = [
                "image/jpeg",
                "image/png",
                "image/webp",
                "image/gif",
            ];

            if (!imageTypes.includes(file.mimetype)) {
                throw new Error("Por favor agrega una imagen .jpg o png");
            }

            if(file.size > 50 * 1024 * 1024){
                throw new Error("Less than 50mg")
            }

            const extensions = file.mimetype.split("/")[1];
            const dirfile = path.join(__dirname, `../public/profiles/${req.user.id}${extensions}`)

            req.flash("messages", [{msg: "Uploaded image"}]);
            return res.redirect("/profile");

        }catch(error){
            req.flash("messages", [{msg: error.message}]);
            return res.redirect("/profile")
        }
    })
}