const registerForm = (req, res) => {
    res.render("register")
}

const loginForm = (req, res) => {
    res.render("login")
}

module.exports = {
    loginForm,
    registerForm,
}