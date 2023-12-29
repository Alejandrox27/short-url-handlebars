const mongoose = require("mongoose");

const {Schema} = mongoose;

const urlSchema = new Schema({
    origin: {
        type: String,
        required: true,
    },
    shortURL: { 
        type: String,
        unique: true,
        required: true,
    },
    user: {
        type: String,
        ref: "User", // model name
        required: true,
    }
})

const Url = mongoose.model("Url", urlSchema);
module.exports = Url;