const express = require("express")
const { create } = require("express-handlebars");

const app = express()

const hbs = create({
    extname: ".hbs",
    partialsDir: ["views/components"],
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./views");


app.get("/", (req, res) => {
    const urls = [
        {origin: "www.google.com", shortURL: "fjadsk1"},
        {origin: "www.google.com", shortURL: "fjadsk2"},
        {origin: "www.google.com", shortURL: "fjadsk3"},
        {origin: "www.google.com", shortURL: "fjadsk4"},
    ]
    res.render("home", {urls: urls});
})

app.get("/login", (req, res) => {
    res.render("login");
})

app.use(express.static(__dirname + "/public"));

app.listen(5000, () => console.log("server on"));