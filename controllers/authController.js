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

        console.log(userName, email, password)
        user = new User({userName, email, password, tokenConfirm: nanoid()});
        
        await user.save();
        res.json(user);

    }catch(error){
        res.json({error: "an error has ocurred during the creation", errormsg: error})
        console.log(error);
    }
}

const loginForm = (req, res) => {
    res.render("login")
}

module.exports = {
    loginForm,
    registerForm,
    registerUser,
}