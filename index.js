const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const { create } = require("express-handlebars");
const csrf = require("csurf");

const User = require("./models/User");
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

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, {id: user._id, userName: user.userName})); //req user
passport.deserializeUser(async (user, done) => {
    const userDB = await User.findById(user.id)
    return done(null, {id: userDB._id, userName: userDB.userName});
});

const hbs = create({
    extname: ".hbs",
    partialsDir: ["views/components"], //partial dirs (components)
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./views");

//detect body requests
app.use(express.urlencoded({extended: true}));

app.use(csrf())

app.use((req, res, next) => {
    //this will render the token to all the views
            //name of the input {{}}
    res.locals.csrfToken = req.csrfToken();
    res.locals.messages = req.flash("messages");
    next()
})

//Routers

app.use("/", require("./routes/home"));
app.use("/auth", require("./routes/auth"));

//Show interface from /public with express static
app.use(express.static(__dirname + "/public"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("server on " + PORT));