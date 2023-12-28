const registerForm = (req, res) => {
    res.render("register")
}

const registerUser = async (req, res) => {
    console.log(req.body);
    res.json(req.body);
}

const loginForm = (req, res) => {
    res.render("login")
}

module.exports = {
    loginForm,
    registerForm,
    registerUser,
}