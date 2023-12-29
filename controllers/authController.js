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

        // send email with confirmation

        res.redirect("/auth/login");

    }catch(error){
        res.json({error: "an error has ocurred during the creation"})
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
    } catch(error) {
        res.json({error: error.message});
    }

    res.redirect("/auth/login");
}

const loginForm = (req, res) => {
    res.render("login")
}

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user) throw new Error("that email doesn't exists");

        if(!user.confirmAccount) throw new Error("the account is not confirmed");

        if(!await user.comparePassword(password)) throw new Error("password non valid");

        res.redirect("/");
    }catch(error){
        res.send(error.message);
    }
}

module.exports = {
    loginForm,
    registerForm,
    registerUser,
    confirmAccount,
    loginUser,
}