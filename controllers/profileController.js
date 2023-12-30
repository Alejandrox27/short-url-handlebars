const formidable = require("formidable");
const Jimp = require("jimp");
const path = require("path");
const fs = require("fs");
const User = require("../models/User");

module.exports.formProfile = async (req, res) => {
    try{
        const user = await User.findById(req.user.id);
        return res.render("profile", {user: req.user, image: user.Image});
    }catch(error){
        req.flash("messages", [{msg: "Error during the read image profile"}])
        return res.redirect("/profile");
    }
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

            const extension = file.mimetype.split("/")[1];
            const dirfile = path.join(__dirname, `../public/img/profiles/${req.user.id}.${extension}`)

            fs.renameSync(file.filepath, dirfile);

            const image = await Jimp.read(dirfile);
            image.resize(200, 200).quality(90).writeAsync(dirfile);

            const user = await User.findById(req.user.id);
            user.Image = `${req.user.id}.${extension}`;
            await user.save();

            req.flash("messages", [{msg: "Uploaded image"}]);

        }catch(error){
            req.flash("messages", [{msg: error.message}]);
        } finally{
            return res.redirect("/profile");
        }
    })
}