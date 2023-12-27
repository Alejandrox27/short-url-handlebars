const mongoose = require("mongoose");

mongoose
    .connect(process.env.URI)
    .then(() => console.log("db connected"))
    .catch(e => console.log("connection failed " + e))