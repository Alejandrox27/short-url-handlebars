const User = require("../models/User");
const { validationResult } = require("express-validator");
const { nanoid } = require("nanoid")

const registerForm = (req, res) => {
    res.render("register", {messages: req.flash("messages")})
}

const registerUser = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        req.flash("messages", errors.array())
        return res.redirect("/auth/register")
    }

    const {userName, email, password} = req.body;
    try{
        let user = await User.findOne({email: email});
        if(user) throw new Error("the user already exists")

        user = new User({userName, email, password, tokenConfirm: nanoid()});
        
        await user.save();

        // send email with confirmation
        req.flash("messages", [{msg: "See your e-mail and validate the account"}]);
        res.redirect("/auth/login");

    }catch(error){
        req.flash("messages", [{msg: error.message}]);
        return res.redirect("/auth/register");
    }
};

const confirmAccount = async (req, res) => {
    const {token} = req.params;

    try {
        const user = await User.findOne({tokenConfirm: token});
        if(!user) throw new Error("The user doesn't exists")

        user.confirmAccount = true;
        user.tokenConfirm = null;

        await user.save();

        req.flash("messages", [{msg: "Verified account, now you can enter"}]);
    } catch(error) {
        res.json({error: error.message});
    }

    res.redirect("/auth/login");
}

const loginForm = (req, res) => {
    res.render("login", {messages: req.flash("messages")})
}

const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        req.flash("messages", errors.array())
        return res.redirect("/auth/login")
    }

    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user) throw new Error("that email doesn't exists");

        if(!user.confirmAccount) throw new Error("the account is not confirmed");

        if(!await user.comparePassword(password)) throw new Error("password non valid");


        //create the user login with passport, sends this info to serializeUser
        req.login(user, function(err) {
            if (err) throw new Error("error with session")
            res.redirect("/");
        })

    }catch(error){
        req.flash("messages", [{msg: error.message}])
        return res.redirect("/auth/login")
    }
}

const logOutSession = (req, res) => {
    req.logout(function(err){
        if(err){
            return res.json({error: err})
        }
    });
    return res.redirect("/auth/login");
}

module.exports = {
    loginForm,
    registerForm,
    registerUser,
    confirmAccount,
    loginUser,
    logOutSession,
}