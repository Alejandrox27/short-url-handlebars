const express = require("express");
const { loginForm, registerForm, registerUser } = require("../controllers/authController");
router = express.Router();

router.get("/register", registerForm);
router.get("/login", loginForm);
router.post("/register", registerUser);

module.exports = router;