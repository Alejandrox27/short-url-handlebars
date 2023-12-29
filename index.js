const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const { create } = require("express-handlebars");
require("dotenv").config()
require("./database/db");

const app = express();

app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    name: "secret-name",
}))

app.use(flash());

app.get("/message-flash", (req, res) => {
    res.json(req.flash("message"));
});

app.get("/create-message", (req, res) => {
    req.flash("message", "this is an error message")
    res.redirect("/message-flash")
})

const hbs = create({
    extname: ".hbs",
    partialsDir: ["views/components"], //partial dirs (components)
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./views");

//detect body requests
app.use(express.urlencoded({extended: true}));

//Routers

app.use("/", require("./routes/home"));
app.use("/auth", require("./routes/auth"));

//Show interface from /public with express static

app.use(express.static(__dirname + "/public"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("server on " + PORT));