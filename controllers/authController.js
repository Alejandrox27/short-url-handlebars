const User = require("../models/User");
const { nanoid } = require("nanoid")

const registerForm = (req, res) => {
    res.render("register")
}

const registerUser = async (req, res) => {
    const {userName, email, password} = req.body;
    try{

        let user = await User.findOne({email: email});
        if(user) throw new Error("the user already exists")

        user = new User({userName, email, password, tokenConfirm: nanoid()});
        
        await user.save();
        res.redirect("/auth/login");

    }catch(error){
        res.json({error: "an error has ocurred during the creation"})
        console.log(error);
    }
};

const confirmAccount = async (req, res) => {
    const {token} = req.params;

    res.json(token);
}

const loginForm = (req, res) => {
    res.render("login")
}

module.exports = {
    loginForm,
    registerForm,
    registerUser,
    confirmAccount,
}