const express = require("express");
const { loginForm, registerForm } = require("../controllers/authController");
router = express.Router()

router.get("/register", registerForm)
router.get("/login", loginForm)

module.exports = router;