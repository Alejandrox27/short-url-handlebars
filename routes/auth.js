const express = require("express");
const { loginForm, registerForm, registerUser, confirmAccount } = require("../controllers/authController");
router = express.Router();

router.get("/register", registerForm);
router.post("/register", registerUser);
router.get("/confirm/:token", confirmAccount);
router.get("/login", loginForm);

module.exports = router;